from flask import Response
import cv2


# 영상 프레임 생성
def generate_video(cctv_id, cctv_images):
    if not cctv_images:
        return
    annotated_frame = cctv_images[cctv_id]
    if annotated_frame is not None:
        image_bytes = cv2.imencode('.jpg', annotated_frame)[1].tobytes()
        frame = b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n'
        return frame


# detecting된 영상을 html로 전송
def video_feed(cctv_id, cctv_images):
    print('[+] 영상 이미지 전송')
    return Response(generate_video(cctv_id, cctv_images),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
