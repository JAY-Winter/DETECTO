from flask import Flask, request, redirect, flash, url_for, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS  # 추가
import os
import shutil
import zipfile
from uploads.train import start
from ultralytics.yolo.engine.trainer import stop
from multiprocessing import Value, Array
from tools.database import db
from repository.repository import Equipment
from tools.cloud import cloud


folders_to_delete = [
    "runs",
    os.path.join("uploads", "test"),
    os.path.join("uploads", "train"),
    os.path.join("uploads", "valid"),
]

train_stop = Value('i', False)
epoch = Value('i', -1)
train_name = Array('c', 100)
def extract_zip_file(zip_file_path, destination_folder, overwrite=True):
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        for member in zip_ref.infolist():
            if overwrite or not os.path.exists(os.path.join(destination_folder, member.filename)):
                zip_ref.extract(member, destination_folder)


# 업로드된 파일을 저장할 폴더 설정
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'zip','ZIP','jpg','JPG','jpeg','JPEG'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024  # 최대 업로드 파일 크기: 1GB
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://wogus:wogus@k8d201.p.ssafy.io/detecto'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'supersecretkey'
db.init_app(app)
CORS(app,supports_credentials=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/stop/<string:name>', methods=['GET'])
def stop(name):

    if epoch.value == -1:
        return {"flag":"fail", "msg" : "실행중인 작업이 없습니다."}, 400
    equipment = Equipment.query.filter_by(name=name).first()
    if equipment.training == 1:
        return {"flag":"fail", "msg" : "이미 학습이 끝났습니다."}, 400
    with train_stop.get_lock():
        if train_stop.value:
            return {"flag":"fail", "msg" : "종료 중인 작업입니다 잠시만 기다려주세요"}
        train_stop.value = True
    if equipment:
        db.session.delete(equipment)
        db.session.commit()
    return {"flag":"success", "msg" : "종료 메세지 전달"}


@app.route('/', methods=['GET'])
def check2():
    return {"flag":"success","msg" : "","data":epoch.value}
@app.route('/check', methods=['GET'])
def check():
    return {"flag":"success","msg" : "","data":epoch.value}

@app.route('/upload', methods=['POST'])
def upload_file():
    if epoch.value != -1:
        return jsonify({"message": "Bad Request"}), 400
    epoch.value = 0
    name = request.form['name']
    description = request.form['description']
    type = int(request.form['type'])
    img = request.files['img']
    url = 'https://kr.object.ncloudstorage.com/detec/samsung.jpg'
    for folder in folders_to_delete:
        if os.path.exists(folder):
            shutil.rmtree(folder)
            print(f"{folder} 폴더가 삭제되었습니다.")
        else:
            print(f"{folder} 폴더가 존재하지 않습니다.")
    if img and allowed_file(img.filename):
        filename = name + ".jpg"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        img.save(file_path)
        object_storage = cloud().client
        object_storage.put_bucket_acl(Bucket="detec", ACL='public-read')
        path = "item/" + filename
        object_storage.upload_file(file_path, "detec", path, ExtraArgs={
                                    'ACL': 'public-read'}) 
        url = "https://kr.object.ncloudstorage.com/detec/item/"+filename
    
    train_name.value=name.encode()
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        extract_zip_file(file_path, app.config['UPLOAD_FOLDER'])
        flash('File successfully uploaded')
        equipment = Equipment(name=name,type=type,able=0,training=0,description=description,url=url)
        db.session.add(equipment)
        db.session.commit()
        start(epoch,train_stop,train_name,app,db)
        return {"flag" : "success","msg" : "", "data" : None}
    
    
    return {"flag" : "fail","msg" : "파일 형식이 일치하지 않습니다. (zip)", "data" : None}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', ssl_context=('fullchain.pem', 'privkey.pem'),threaded=True)
