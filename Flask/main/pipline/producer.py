import cv2
import json
import base64
from datetime import datetime
from kafka import KafkaProducer

# Kafka broker 정보
bootstrap_servers = ['k8d201.p.ssafy.io:9092']

# Kafka topic 이름
topic = 'records'
cctv_total_number = 4
# Producer 설정
producer_config = {
    'bootstrap_servers': bootstrap_servers,
    'value_serializer': lambda v: json.dumps(v).encode('utf-8'),
    'key_serializer': lambda v: v
}
producer = KafkaProducer(**producer_config)

# 메시지 전송 함수
def send_message(img, cctv_number, timestamp):
    global cctv_total_number, topic
    # 이미지 직렬화 및 Base64 인코딩
    _, buffer = cv2.imencode('.jpg', img)
    encoding_img = base64.b64encode(buffer).decode('utf-8')

    # cctv_total_number를 고려하여 파티션 번호를 결정합니다.
    partition = (cctv_number - 1) % cctv_total_number
    encoding_key = f'cctv.{cctv_number}'.encode('utf-8')
    
    # 메시지에 이미지와 시간 정보를 포함합니다.
    message = {'image': encoding_img, 'timestamp': timestamp.isoformat()}
    producer.send(topic=topic, key=encoding_key, value=message, partition=partition)
    producer.flush()

######### 아래는 예제 
file_path = '/Users/heyon/Desktop/SAMSUNG/S08P31D201/Flask/main/pipline/test.jpg'
img = cv2.imread(file_path)
current_timestamp = datetime.now()

send_message(img=img, cctv_number=1, timestamp=current_timestamp)