from flask import Flask, render_template, request
from .stream.receive_image import upload_image
from .stream.send_to_client import video_feed
from .connect.check_cctv_connection import check_connection
from ultralytics import YOLO
from .constants.constant import MODEL_PATH
from main.tools.database  import db

app = Flask(__name__)
model = YOLO(MODEL_PATH)


def create_app():
    cctv_list = set()  # 연결된 cctv 목록
    cctv_images = {}
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://wogus:wogus@k8d201.p.ssafy.io/detecto'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    @app.route('/cctv/<cctv_id>')
    def image(cctv_id):
        return render_template('index.html', cctv_id=cctv_id)

    @app.route('/')
    def index():
        return render_template("init.html")

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
