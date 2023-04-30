import numpy as np
import cv2

# CCTV로부터 영상(이미지)를 받아오기

def upload_image(request, model, cctv_images):
    file = request.files['file']
    contents = file.read()
    signal = True
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    cctv_id = int(request.form['id'])
    print(f'[O] Received CCTV NUM: {cctv_id}')

    results = model(img)  # YOLO
    cctv_images[cctv_id] = results[0].plot()
    # print(f'     [-] image {cctv_images[cctv_id]}')

    return {"result": "이미지 업로드 성공"}
