import numpy as np
import cv2, copy
from main.distance.calculate import calculate
from main.constants.constant import CCTV_MAX
# CCTV로부터 영상(이미지)를 받아오기

def upload_image(request, model,face_model):
    # 이미지 변환
    file = request.files['file']
    contents = file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # CCTV id
    cctv_id = int(request.form['id'])
    cctv_image = img
    print(f'[O] Received CCTV NUM: {cctv_id}')

    # 4대 이상이면 검출 후 비워주기
    calculate(cctv_id,cctv_image, model,face_model)
    # if len(cctv_images) == CCTV_MAX:
    #     for idx in cctv_images:
    #         cv2.imwrite(f"{i}_{idx}.png", cctv_images[idx])
    #     cctv_images = {}
    #     i = i + 1
    return
