import cv2
import numpy as np
import time
import math
from main.tools.cloud import cloud
from ..repasitory.repasitory import Report
from ...main.app import app
from ..tools.database import db
from datetime import datetime
import os

object_storage = cloud().client
real_object_height = 23.6
focal_length = 800
pro = set({1, 2, 3, 6, 7})


def calculate_distance(real_height, focal_length, image_height):
    return (real_height * focal_length) / image_height


def calculate(imglist, model):
    j = 1
    distance = np.zeros((5))
    person = set([])
    for tmp in imglist:
        img = cv2.imread(tmp)
        img = cv2.resize(img, (640, 640))
        results = model(img, conf=0.5)
        annotated_frame = results[0].plot()
        
        i = 0
        h = 0
        for classs in results[0].boxes.cls:
            if int(classs.item()) in pro:
                # 미착용한 장비 찾기
                person.add(int(classs.item()))
        
            if int(classs.item()) == 7 or int(classs.item()) == 9:
                h = (results[0].boxes.boxes[i][3] - results[0].boxes.boxes[i][1]).item()
                distance[j] = calculate_distance(real_object_height, focal_length, h)
                continue
            i = i + 1
        j += 1

    current_time = int(time() * 1000)
    if len(person) != 0:
        # DB에 리포트 등록
        id = 0
        with app.app_context():
            new_report = Report(userId=1, time=current_time, url="https://naver.com")
            db.session.add(new_report)
            db.session.flush()  
            id = new_report.id
            db.session.commit()
        
        if id != 0:
            with app.app_context():
                report_to_update = Report.query.get(id)
                report_to_update.url = "https://kr.object.ncloudstorage.com/detec/report/"+str(id)
                db.session.commit()
            i = 1
            for img in imglist:
                filename = f"{current_time}.jpg"
                cv2.imwrite(filename, annotated_frame)
                local_file_path = os.path.abspath(filename)
                object_storage.upload_file(local_file_path, "detec", "report/"+str(id)+"/"+str(i))
                i = i+1

    arr = np.zeros((100, 65))
    center_x = [0, 0, 0, 99, 99, 0]
    center_y = [0, 0, 64, 0, 64, 0]

    i, j = np.meshgrid(np.arange(100), np.arange(65), indexing="ij")
    for k in range(1, 5):
        mask = (
            np.sqrt((center_x[k] - i) ** 2 + (center_y[k] - j) ** 2)
            <= int(distance[k] / 10) + 20
        )
        arr[mask] = arr[mask] + 1
    visualize_arr = np.zeros((100, 65, 3), dtype=np.uint8)

    mask_1 = arr == 1
    mask_2 = arr == 2
    mask_3 = arr == 3
    mask_4 = arr == 4
    visualize_arr[mask_1] = (55, 55, 55)
    visualize_arr[mask_2] = (100, 100, 100)
    visualize_arr[mask_3] = (175, 175, 175)
    visualize_arr[mask_4] = (255, 255, 255)

    coords = np.argwhere(arr == 4)
    mean_coord = np.mean(coords, axis=0)
    if math.isnan(mean_coord[0]):
        coords = np.argwhere(arr == 3)
        mean_coord = np.mean(coords, axis=0)
    if math.isnan(mean_coord[0]):
        coords = np.argwhere(arr == 2)
        mean_coord = np.mean(coords, axis=0)
    if math.isnan(mean_coord[0]):
        coords = np.argwhere(arr == 1)
        mean_coord = np.mean(coords, axis=0)
    if math.isnan(mean_coord[0]):
        mean_coord = [50,50]    
    scale = 5
    resized_visualize_arr = cv2.resize(
        visualize_arr, (65 * scale, 100 * scale), interpolation=cv2.INTER_NEAREST
    )
    cv2.imwrite("debug.jpg", resized_visualize_arr)
    return [int(mean_coord[0]),int(mean_coord[1])]
