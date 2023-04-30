import cv2
import base64
from kafka import KafkaProducer

# Kafka broker 정보
bootstrap_servers = 'k8d201.p.ssafy.io:9092'

# Kafka topic 이름
topic = 'records'
cctv_total_number = 4
# Producer 설정
producer_config = {
    'bootstrap_servers': bootstrap_servers,
    'value_serializer': lambda v: v.encode('utf-8'),
    'key_serializer': lambda v: v
}
producer = KafkaProducer(**producer_config)

# 메시지 전송 함수
def send_message(img, cctv_number):
    global cctv_total_number, topic
    # 이미지 직렬화 및 Base64 인코딩
    _, buffer = cv2.imencode('.jpg', img)
    encoding_img = base64.b64encode(buffer).decode('utf-8')

    # cctv_total_number를 고려하여 파티션 번호를 결정합니다.
    partition = (cctv_number - 1) % cctv_total_number
    encoding_key = f'cctv.{cctv_number}'.encode('utf-8')
    producer.send(topic=topic, key=encoding_key, value=encoding_img, partition=partition)
img = cv2.imread('/Users/heyon/Desktop/SAMSUNG/S08P31D201/Flask/main/pipline/test.jpg')
send_message(img, 1)