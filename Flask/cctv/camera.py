import cv2
import requests
from constants.constant import FLASK_URL, CAMERA_INDEX, CCTV_NUMBER
import time


class Camera():
    def __init__(self):
        self.__camera_index = int(CAMERA_INDEX)
        self.__cctvNum = CCTV_NUMBER
        self.__flaskUrl = FLASK_URL

    # open camera
    def open_camera(self):
        return cv2.VideoCapture(self.__camera_index)

    # close camera
    def close_camera(self, cap):
        print('[X] cam closed')
        cap.release()
        cv2.destroyAllWindows()

    # open camera
    def capture(self, cap):
        # 웹캠에서 프레임 읽기
        print('capcap', cap)

        if cap != None and cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                print('[X] no ret!')
                return

            print('  [O]', time, cap)

            frame = cv2.resize(frame, (640, 480))

            # 프레임 이미지를 flask 서버로 전송
            _, img_encoded = cv2.imencode('.jpg', frame)
            img_bytes = img_encoded.tobytes()
            files = {'file': ('image.jpg', img_bytes, 'image/jpeg')}
            data = {'id': self.__cctvNum, 'time': time}
            response = requests.post(
                self.__flaskUrl + '/upload', files=files, data=data)

            print('---------> ', response.status_code)

            if response.status_code == 200:
                print('[O] 이미지 업로드 성공')
            else:
                print('[X] 이미지 업로드 실패', response.status_code)

    def run_camera(self, cap):
        try:
            print('[*] Open camera', cap)
            while True:
                time.sleep(3)
                print(cap)
                # if self.__cap.isOpened():
                #     ret, frame = self.__cap.read()
                # if not ret:
                # print('[XX] no ret!')

        finally:
            self.close_camera(cap)
