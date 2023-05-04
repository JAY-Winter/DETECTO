import cv2
import numpy as np


# 맵 그리기
def draw_map(distance):
    # 100 x 83 맵
    arr = np.zeros((100, 83), dtype=np.int32)

    for i in range(16, 27):
        for j in range(19, 48):
            arr[i][j] = -1
    for i in range(27, 55):
        for j in range(57, 59):
            arr[i][j] = -1
    for i in range(91, 100):
        for j in range(0, 12):
            arr[i][j] = -1

    center_x = [0, 0, 0, 99, 99, 0]
    center_y = [0, 0, 82, 11, 82, 0]

    # 겹치는 수
    i, j = np.meshgrid(np.arange(100), np.arange(83), indexing="ij")
    for k in range(1, 5):
        if distance[k] == 0:
            continue
        mask = (
            np.sqrt((center_x[k] - i) ** 2 + (center_y[k] - j) ** 2)
            <= int(distance[k] / 10) + 20
        ) & (arr != -1)
        arr[mask] = arr[mask] + 1
    visualize_arr = np.zeros((100, 83, 3), dtype=np.uint8)

    # 겹친 수대로 색칠
    mask_1 = arr == 1
    mask_2 = arr == 2
    mask_3 = arr == 3
    mask_4 = arr == 4
    visualize_arr[mask_1] = (55, 55, 55)
    visualize_arr[mask_2] = (100, 100, 100)
    visualize_arr[mask_3] = (175, 175, 175)
    visualize_arr[mask_4] = (255, 255, 255)

    # 디버그 이미지
    scale = 5
    resized_visualize_arr = cv2.resize(
        visualize_arr, (83 * scale, 100 * scale), interpolation=cv2.INTER_NEAREST
    )
    cv2.imwrite("debug.jpg", resized_visualize_arr)

    return arr
