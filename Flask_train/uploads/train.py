import sys
import re
from ultralytics.yolo.engine.model import YOLO
from io import StringIO
import threading

model = YOLO('./uploads/yolov8n.pt')

def start(epoch,train_stop,train_name,app,db):
    with app.app_context():
        train_thread = threading.Thread(target=train,args=(epoch,train_stop,train_name,app,db,))
        train_thread.start()

def train(epoch,train_stop,train_name,app,db):
    try:
        print("dddddddd")
        results = model.train(epochvalx=epoch,train_stop=train_stop,train_name=train_name,app=app,db=db,data='C:/Users/sung/Desktop/ziptest/uploads/data.yaml', epochs=100, batch=4)
    except:
        epoch.value = -1