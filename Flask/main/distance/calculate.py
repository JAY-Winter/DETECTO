import cv2
import numpy as np
from main.tools.cloud import cloud
from ..repository.repository import Report, ReportItem
from ..tools.database import db
from datetime import datetime
import os
from main.distance.is_detect import detect_non_wearing
from main.distance.draw_map import draw_map, get_mean_coord

real_object_height = 23.6   # 사람 머리 평균
focal_length = 800          # 초점 거리
pro = set({1, 2, 3, 6, 7})  # 미착용 클래스 번호


def calculate_distance(real_height, focal_length, image_height):
    return (real_height * focal_length) / image_height


def calculate(imglist, model):
    distance = np.zeros((5))
    person = set([])
    imglist_results = []

    for j in imglist:
        img = cv2.resize(imglist[j], (640, 640))
        results = model(img, conf=0.5)
        annotated_frame = results[0].plot()
        imglist_results.append(results[0].boxes.cls)

        i = 0
        h = 0
        for classs in results[0].boxes.cls:
            if int(classs.item()) in pro:
                person.add(int(classs.item()))

            # 7:머리, 9:헬멧
            if int(classs.item()) == 7 or int(classs.item()) == 9:
                h = (results[0].boxes.boxes[i][3] -
                     results[0].boxes.boxes[i][1]).item()    # 사람 머리 높이
                distance[j] = calculate_distance(
                    real_object_height, focal_length, h)       # 사람 - 카메라 거리
                continue
            i = i + 1

    # 4개 이미지에서 미착용자 찾기
    detect_non_wearing(pro, imglist_results)

    current_time = datetime.utcnow()
    print(person)

    arr_map = draw_map(distance)            # 맵 그리기 / 반환
    mean_coord = get_mean_coord(arr_map)    # 맵으로 평균 좌표 구하기

    # 미착용자 DB에 저장
    if len(person) != 0:
        id = 0
        new_report = Report(user_id=-1, time=current_time,
                            x=int(mean_coord[0]), y=int(mean_coord[1]))
        db.session.add(new_report)
        db.session.flush()
        id = new_report.id
        db.session.commit()

        object_storage = cloud().client
        object_storage.put_bucket_acl(Bucket="detec", ACL='public-read')

        i = 1
        for img in imglist:
            filename = f"{current_time.second}_{i}.jpg"
            cv2.imwrite(filename, annotated_frame)
            local_file_path = os.path.abspath(filename)
            object_storage.upload_file(local_file_path, "detec", "report/"+str(
                id)+"/"+str(i)+".jpg", ExtraArgs={'ACL': 'public-read'})
            i = i+1
        for thing in person:
            new_report = ReportItem(equipment_id=thing, report_id=id)
            db.session.add(new_report)
        db.session.commit()

    return
