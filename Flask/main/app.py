from flask import Flask, render_template, request
from .stream.receive_image import upload_image
from .stream.send_to_client import video_feed
from .connect.check_cctv_connection import check_connection
from ultralytics import YOLO
from .constants.constant import MODEL_PATH, MODEL_FACE_PATH
from main.tools.database  import db
from kafka import KafkaProducer
import json
app = Flask(__name__)
model = YOLO(MODEL_PATH)

face_model = YOLO(MODEL_FACE_PATH)
kafka_producer = KafkaProducer(
            bootstrap_servers='k8d201.p.ssafy.io:9092',
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
            acks='all', 
            retries=5,
        )
cctv_images = {}
def create_app():
    global app
    cctv_list = set()  # 연결된 cctv 목록
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
        upload_image(kafka_producer,request, model,face_model)
        return {"result": "이미지 업로드 성공"}

    # html로 detecting된 영상 전송
    @app.route('/stream/<int:cctv_id>')
    def stream(cctv_id):
        return video_feed(cctv_id, cctv_images)

    return app
