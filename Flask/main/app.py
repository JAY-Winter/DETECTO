from flask import Flask, render_template, request
from ultralytics import YOLO
from .stream.receive import upload_image
from .stream.send import video_feed
from main.tools.database  import db

app = Flask(__name__)

def create_app():
    cctv_list = {}
    model = YOLO("model/best.pt")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://wogus:wogus@k8d201.p.ssafy.io/detecto'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    

    @app.route("/", defaults={"cctv_id": "0"})
    @app.route("/<cctv_id>")
    def index(cctv_id):
        return render_template("index.html", cctv_id=cctv_id)

    # CCTV로부터 영상(이미지)를 받아오기
    @app.route("/upload", methods=["POST"])
    def upload():
        return upload_image(request, model, cctv_list)

    # html로 detecting된 영상 전송
    @app.route("/stream/<int:cctv_id>")
    def stream(cctv_id):
        return video_feed(cctv_id, cctv_list)

    return app
