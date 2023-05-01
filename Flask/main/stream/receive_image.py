import numpy as np
import cv2
from main.distance.calculate import calculate
from main.constants.constant import CCTV_MAX
# CCTV로부터 영상(이미지)를 받아오기


def upload_image(request, model, cctv_images):
    # 이미지 변환
    file = request.files['file']
    contents = file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # CCTV id
    cctv_id = int(request.form['id'])
    cctv_images[cctv_id] = img
    print(f'[O] Received CCTV NUM: {cctv_id}')
    if len(cctv_images) == CCTV_MAX:
        calculate(cctv_images,model)
        cctv_images = {}
    return {"result": "이미지 업로드 성공"}
