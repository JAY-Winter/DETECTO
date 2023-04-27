import numpy as np
import cv2

# CCTV로부터 영상(이미지)를 받아오기
def upload_image(request, model, cctv_images):
  file = request.files['file']
  contents = file.read()
  nparr = np.frombuffer(contents, np.uint8)
  img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
  
  cctv_id = int(request.form['id'])
  time = float(request.form['id'])
  print(f'[IMAGE] {cctv_id} - {time}')

  results = model(img) # YOLO
  cctv_images[cctv_id] = results[0].plot()

  return {"result": "이미지 업로드 성공"}