import numpy as np
import cv2, copy, queue
from main.constants.constant import CCTV_MAX
# CCTV로부터 영상(이미지)를 받아오기
cctv_images = {}
list = [queue.Queue(),queue.Queue(),queue.Queue()]

def upload_image(file, cctv_id):
    # 이미지 변환
    contents = file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    print(f'[O] Received CCTV NUM: {cctv_id}')
    list[cctv_id].put(img)
    # 4대 이상이면 검출 후 비워주기
    # calculate(kafka_producer, cctv_id,cctv_images[cctv_id], model,face_model)
    # if len(cctv_images) == CCTV_MAX:
    #     for idx in cctv_images:
    #         cv2.imwrite(f"{i}_{idx}.png", cctv_images[idx])
    #     cctv_images = {}
    #     i = i + 1
    return
