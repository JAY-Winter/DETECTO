import cv2, json, base64, time, queue
import numpy as np
from datetime import datetime
from main.distance.is_detect import detect_non_wearing
from main.distance.draw_map import draw_map
from main.distance.cal_from_cctv_to_head import cal_from_cctv_to_head, get_mean_coord
from main.distance.save_non_wear import save_non_wear
from main.repository.repository import Equipment
from kafka import KafkaProducer
from ultralytics import YOLO
from main.constants.constant import MODEL_PATH, MODEL_FACE_PATH
# 미착용 클래스 번호
from main.app import app
from main.stream.receive_image import list
model = [YOLO(MODEL_PATH),YOLO(MODEL_PATH),YOLO(MODEL_PATH)]
face_model = [YOLO(MODEL_FACE_PATH),YOLO(MODEL_FACE_PATH),YOLO(MODEL_FACE_PATH)]

kafka_producer = KafkaProducer(
            bootstrap_servers='k8d201.p.ssafy.io:9092',
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
            acks='all', 
            retries=5,
        )


def findHuman(boxes):
    center_box = []
    human_box = []
    human_detect = {}
    equipments = Equipment.query.all()
    pro = set({})
    i= 0
    for equip in equipments :
        if equip.type == 0 and equip.able == 1 and equip.name != 'human' and equip.name != 'person':
            pro.add(i)
        i=i+1
        
    for box in boxes:
        xyxy = box.xyxy[0]
        x1, y1, x2, y2 = xyxy.cpu().numpy()

        if box.cls == 9:
            human_box.append([x1, y1, x2, y2])
        elif box.cls == 10:
            continue
        else:
            center_x = (x1 + x2) / 2
            center_y = (y1 + y2) / 2
            center_box.append([int(box.cls.item()), center_x, center_y])

    human_box = np.array(human_box)
    center_box = np.array(center_box)
    seta = set()
    for coor in center_box:
        cls, x, y = coor
        if cls not in pro:
            continue
        min_dist = float('inf')
        min_idx = -1
        min_h_box = []
        for idx, h_box in enumerate(human_box):
            if idx in seta:
                continue
            seta.add(idx)
            if h_box[0] <= x <= h_box[2] and h_box[1] <= y <= h_box[3]:
                center_h_box = ((h_box[0] + h_box[2]) / 2, (h_box[1] + h_box[3]) / 2)
                dist = distance((x, y), center_h_box)
                if dist < min_dist:
                    min_h_box = h_box
                    min_dist = dist
                    min_idx = idx

        if min_idx != -1:
            if min_idx not in human_detect:
                human_detect[min_idx] = []
            human_detect[min_idx].append([cls,min_h_box[0],min_h_box[1],min_h_box[2],min_h_box[3]])

    return human_detect

def distance(point1, point2):
    return np.sqrt((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2)

# 이미지 처리
def calculate(cctv_id):
    prev_time = time.time()
    while True:
        try:
            with app.app_context():
                item = list[cctv_id].get()
                if item is None:
                    continue
                # list[cctv_id].put(img)
                img = item
                # q.task_done()
            # yolo_images = []
            # yolo_classes = []
            # distances = np.zeros((5))

            # 사진마다 YOLO 적용
            # for i in imglist:

                # img = cv2.resize(img, (640, 640))
                results = model[cctv_id](img, conf=0.5,device="0")
                year = 23
                cctv_number = cctv_id
                today = datetime.now()
                partition_key = today.timetuple().tm_yday - 1
                # partition_key = 133
                kafka_topic = f'cctv.{cctv_number}.{year}'
                yolo_image = results[0].plot()
                # _, img_encoded = cv2.imencode('.jpg', yolo_image)
                _, img_encoded = cv2.imencode('.jpg', yolo_image)
                
                encoded_frame = base64.b64encode(img_encoded).decode('utf8')
                
                kafka_data = {
                    'frame': encoded_frame,
                    'timestamp': base64.b64encode(bytes(str(datetime.now()), 'utf-8')).decode('utf-8'),
                }

                kafka_producer.send(
                    topic=kafka_topic,
                    value=kafka_data,
                    partition=partition_key,
                )
                kafka_producer.flush()
                if  time.time()-prev_time < 5:
                    list[cctv_id] = queue.Queue()
                    continue
                prev_time = time.time()
                human_detect = findHuman(results[0].boxes)
                # yolo_class = results[0].boxes.cls

                # cctv ~ 사람 거리
                # distances[i] = cal_from_cctv_to_head(results)

                # print('[%] distances: ', distances)

                # 4개 이미지에서 미착용자 찾기
                # non_wearing_class = detect_non_wearing(pro, yolo_class)
                # print('non_wearing_class : ', non_wearing_class)

                # arr_map = draw_map(distances)               # 맵 그리기 / 반환
                # mean_coord = get_mean_coord(arr_map)        # 맵으로 평균 좌표 구하기
                # print('mean: ', mean_coord)

                # DB에 미착용자 저장
                if len(human_detect) != 0:
                    save_non_wear(cctv_id,human_detect, yolo_image, img, face_model[cctv_id])
                list[cctv_id] = queue.Queue()
        except Exception as e:
            model[cctv_id] = YOLO(MODEL_PATH)
            continue
