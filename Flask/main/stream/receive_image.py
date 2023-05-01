import numpy as np
import cv2

# CCTV로부터 영상(이미지)를 받아오기


def upload_image(request, model, cctv_images):
    # 이미지 변환
    file = request.files['file']
    contents = file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # CCTV id
    cctv_id = int(request.form['id'])

    # 이미지 분석
    results = model(img)  # YOLO
    cctv_images[cctv_id] = results[0].plot()
    print(f'[O] Received CCTV NUM: {cctv_id}')

    return {"result": "이미지 업로드 성공"}
