from flask import Response
import cv2
from time import time
# 영상 프레임 생성
prev_time = time()

def generate_video(cctv_id, cctv_images):
    global prev_time
    print('[+++++]')
    while True:
        annotated_frame = cctv_images[cctv_id]
        if time()-prev_time<1:
            continue
        prev_time = time()
        if annotated_frame is not None:
            image_bytes = cv2.imencode('.jpg', annotated_frame)[1].tobytes()
            frame = b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n'
            yield frame

# detecting된 영상을 html로 전송


def video_feed(cctv_id, cctv_images):
    
    print('    [???]', cctv_images[cctv_id])
    return Response(generate_video(cctv_id, cctv_images),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
