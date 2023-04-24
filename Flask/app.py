from flask import Flask, request, Response, render_template
import flask_profiler
import numpy as np
import cv2
from ultralytics import YOLO

app = Flask(__name__)
annotated_frame = None
cctv_list = {}
model = YOLO('model/best.pt')

'''
{id: 0, frame: ~~}
'''

app.config["flask_profiler"] = {
    "enabled": True,
    "storage": {
        "engine": "sqlite"
    },
    "basicAuth": {
        "enabled": True,
        "username": "root",
        "password": "root"
    },
    "ignore": [
        "^/static/.*"
    ]
}

flask_profiler.init_app(app)

# CCTV로부터 영상(이미지)를 받아오기
@app.route('/upload_image', methods=['POST'])
def upload_image():
    global cctv_list
    file = request.files['file']
    contents = file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    results = model(img) # YOLO
    # annotated_frame = results[0].plot()

    cctv_id = int(request.form['id'])
    cctv_list[cctv_id] = results[0].plot()
    print('cctv id: ', cctv_id)
    # print('             ', cctv_list[cctv_id])
    return {"result": "이미지 업로드 성공"}

# 영상 프레임 생성
def generate_video(cctv_id):
    annotated_frame = cctv_list[cctv_id]
    if annotated_frame is not None:
        image_bytes = cv2.imencode('.jpg', annotated_frame)[1].tobytes()
        # frame = b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + image_bytes + b'\r\n'
        return image_bytes

# CCTV 화면 받기
@app.route('/<int:cctv_id>')
def index(cctv_id):
    return render_template('index.html', cctv_id=cctv_id)

# html로 detecting된 영상 전송
@app.route('/video_feed/<cctv_id>')
def video_feed(cctv_id):
    print(cctv_id)
    return Response(generate_video(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)