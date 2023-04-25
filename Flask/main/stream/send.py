from flask import Response
import cv2

# 영상 프레임 생성
def generate_video(cctv_id, cctv_list):
  while True:
    annotated_frame = cctv_list[cctv_id]
    if annotated_frame is not None:
      image_bytes = cv2.imencode('.jpg', annotated_frame)[1].tobytes()
      frame = b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n'
      yield frame

# detecting된 영상을 html로 전송
def video_feed(cctv_id, cctv_list):
  return Response(generate_video(cctv_id, cctv_list),
                  mimetype='multipart/x-mixed-replace; boundary=frame')
