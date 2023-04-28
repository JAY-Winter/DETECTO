import numpy as np
import cv2

# CCTV로부터 영상(이미지)를 받아오기
def upload_image(request, model, cctv_list):
  file = request.files['file']
  contents = file.read()
  nparr = np.frombuffer(contents, np.uint8)
  img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
  
  results = model(img) # YOLO

  cctv_id = int(request.form['id'])
  cctv_list[cctv_id] = results[0].plot()

  print('cctv id: ', cctv_id)
  # print(cctv_list[cctv_id])

  return {"result": "이미지 업로드 성공"}