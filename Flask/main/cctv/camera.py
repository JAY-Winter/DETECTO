import cv2
from datetime import datetime
from kafka import KafkaProducer
import requests, time, json, base64
from main.constants.constant import FLASK_URL, CCTV_NUMBER, CAMERA_INDEX

class Camera():
    def __init__(self):
        self.__cap = None
        self.__cctvNum = CCTV_NUMBER
        self.__flaskUrl = FLASK_URL
        # self.__signal = shared_signal

    # @property
    # def signal(self):
    #     return self.__signal

    # close camera
    def close_camera(self):
        print('[X] cam closed')
        self.__cap.release()
        cv2.destroyAllWindows()

    # open camera
    def capture(self, frame):
        frame = cv2.resize(frame, (640, 640))

        # 프레임 이미지를 flask 서버로 전송
        _, img_encoded = cv2.imencode('.jpg', frame)
        img_bytes = img_encoded.tobytes()
        files = {'file': ('image.jpg', img_bytes, 'image/jpeg')}
        data = {'id': self.__cctvNum}

        response = requests.post(
            self.__flaskUrl + '/upload', files=files, data=data)

        # print(response)

        if response.status_code == 200:
            print('[O] 이미지 업로드 성공')
        else:
            print('[X] 이미지 업로드 실패', response.status_code)

    def main(self):
        cam = cv2.VideoCapture(cv2.CAP_DSHOW + CAMERA_INDEX)
        next_capture_time = time.perf_counter()
        print('[*] Open camera', cam)
        while cam.isOpened():
            ret, frame = cam.read()
            if not ret:
                print('[X] no ret!')
            current_time = time.perf_counter()
            if current_time >= next_capture_time:
                self.capture(frame=frame)
                next_capture_time = current_time + 0.5
            
            # with self.__signal.get_lock():  # Acquire the lock before accessing the value
            #     if self.__signal.value:
            #         # 이미지 전송 또는 다른 작업 수행
                    
            #         self.__signal.value = False
            #         # print(frame)
