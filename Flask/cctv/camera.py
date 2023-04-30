import cv2
import requests

from multiprocessing import Value


class Camera():
    def __init__(self, cctvNum, flaskUrl, shared_signal):
        self.__camera_index = 0
        self.__cap = None
        self.__cctvNum = cctvNum
        self.__flaskUrl = flaskUrl
        self.__signal = shared_signal

    @property
    def signal(self):
        return self.__signal

    # close camera
    def close_camera(self):
        print('[X] cam closed')
        self.__cap.release()
        cv2.destroyAllWindows()

    # open camera
    def capture(self):
        cam = cv2.VideoCapture(0)
        if cam.isOpened():
            ret, frame = cam.read()
            if not ret:
                print('[X] no ret!')
                return

            print('[+] capture!! ')

            frame = cv2.resize(frame, (640, 480))

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
        cam = cv2.VideoCapture(self.__camera_index)
        print('[*] Open camera', cam)
        while cam.isOpened():
            ret, frame = cam.read()
            if not ret:
                print('[X] no ret!')
            cv2.imshow('title', frame)
            cv2.waitKey(0)
            with self.__signal.get_lock():  # Acquire the lock before accessing the value
                if self.__signal.value:
                    # 이미지 전송 또는 다른 작업 수행
                    self.capture()
                    self.__signal.value = False
                    # print(frame)
