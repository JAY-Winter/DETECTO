import cv2
import numpy as np
from main.distance.is_detect import detect_non_wearing
from main.distance.draw_map import draw_map
from main.distance.cal_from_cctv_to_head import cal_from_cctv_to_head, get_mean_coord
from main.distance.save_non_wear import save_non_wear


# 미착용 클래스 번호
pro = set({1, 2, 3, 6, 7})


# 이미지 처리
def calculate(imglist, model):

    yolo_images = []
    yolo_classes = []
    distances = np.zeros((5))

    # 사진마다 YOLO 적용
    for i in imglist:
        img = cv2.resize(imglist[i], (640, 640))
        results = model(img, conf=0.5)

        yolo_images.append(results[0].plot())
        yolo_classes.append(results[0].boxes.cls)

        # cctv ~ 사람 거리
        distances[i] = cal_from_cctv_to_head(results)

    print('[%] distances: ', distances)

    # 4개 이미지에서 미착용자 찾기
    non_wearing_class = detect_non_wearing(pro, yolo_classes)
    print('non_wearing_class : ', non_wearing_class)

    arr_map = draw_map(distances)               # 맵 그리기 / 반환
    mean_coord = get_mean_coord(arr_map)        # 맵으로 평균 좌표 구하기
    print('mean: ', mean_coord)

    # DB에 미착용자 저장
    save_non_wear(len(imglist), non_wearing_class, mean_coord, yolo_images)

    return
