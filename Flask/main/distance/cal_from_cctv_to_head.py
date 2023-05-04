import numpy as np
import math

real_object_height = 23.6   # 사람 머리 평균
focal_length = 800          # 초점 거리


# 초점 거리 이용해 거리 구하기
def focus_distance(real_height, focal_length, image_height):
    return (real_height * focal_length) / image_height


# CCTV에서 머리까지 거리 구하기
def cal_from_cctv_to_head(results):
    # 검출된 클래스 하나씩 돌며
    for i in range(len(results[0].boxes.cls)):
        cls = results[0].boxes.cls[i]

        # 머리(7), 헬멧(9) 검출되면
        if int(cls.item()) == 7 or int(cls.item()) == 9:
            height = (results[0].boxes.data[i][3] -
                      results[0].boxes.data[i][1]).item()    # 사람 머리 높이
            print('[&] Head/Helmet Height', height)
            return focus_distance(
                real_object_height, focal_length, height)       # 사람 - 카메라 거리
    return 0

# 평균 좌표 구하기


def get_mean_coord(arr):
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
        mean_coord = [50, 42]

    return mean_coord
