# Server
'''
    Server
    - MESSAGE_QUEUE : RabbitMQ
    - MODEL_PATH    : YOLO 모델 경로
    - CCTV_MAX      : 최대 CCTV 개수 (ex. 4대)
    - CCTV_TRIGGER_TIME : t초마다 이미지 받기
'''
MESSAGE_QUEUE = {
    'URL': 'k8d201.p.ssafy.io',
    'PORT': 5672,
    'VHOST': '/',
    'NAME': 'hello',
    'ID': 'guest',
    'PW': 'guest',
}
MODEL_PATH = 'model/best.pt'

CCTV_MAX = 4
CCTV_TRIGGER_TIME = 5

# CCTV
'''
    CCTV
    - FLASK_URL     : flask 서버 경로
    - CCTV_NUMBER   : CCTV 번호 (ex. 1, 2, 3, 4번)
    - CAMERA_INDEX  : 0(내장캠), 1(유선캠)
'''
FLASK_URL = 'http://192.168.100.210:5000'
# FLASK_URL = 'http://127.0.0.1:5000'
CCTV_NUMBER = 1
CAMERA_INDEX = 0


'''
0: apron
1: arm
2: body
3: face
4: glasses
5: gloves
6: hands
7: head
8: helmet
9: tosi
'''
