from flask import Flask, render_template, request
from ultralytics import YOLO
from .stream.receive_image import upload_image
from .stream.send_to_client import video_feed
from .cctv.check_cctv_connection import check_connection


def create_app():
    app = Flask(__name__)
    cctv_list = set()  # 연결된 cctv 목록
    cctv_images = {}
    model = YOLO('model/best.pt')

    @app.route('/', defaults={'cctv_id': '1'})
    @app.route('/<cctv_id>')
    def index(cctv_id):
        return render_template('index.html', cctv_id=cctv_id)

    @app.route('/connect', methods=['POST'])
    def connect():
        return check_connection(request, cctv_list)

    # CCTV로부터 영상(이미지)를 받아오기
    @app.route('/upload', methods=['POST'])
    def upload():
        return upload_image(request, model, cctv_images)

    # html로 detecting된 영상 전송
    @app.route('/stream/<int:cctv_id>')
    def stream(cctv_id):
        return video_feed(cctv_id, cctv_images)

    return app
