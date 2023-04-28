import pika
from camera import Camera
from multiprocessing import Process
from constants.constant import MESSAGE_QUEUE, CAMERA_INDEX, CCTV_NUMBER, FLASK_URL
import time
import cv2
import requests


signal = False


class message_queue():

    def __init__(self):
        self.__url = MESSAGE_QUEUE['URL']
        self.__port = MESSAGE_QUEUE['PORT']
        self.__vhost = MESSAGE_QUEUE['VHOST']
        self.__cred = pika.PlainCredentials(
            MESSAGE_QUEUE['ID'], MESSAGE_QUEUE['PW'])
        self.__queue = MESSAGE_QUEUE['NAME']
        self.__cap = None
        self.__camera_index = int(CAMERA_INDEX)
        self.__cctvNum = CCTV_NUMBER
        self.__flaskUrl = FLASK_URL

    # connect to RabbitMQ
    def connect_pika(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(
            self.__url, int(self.__port), self.__vhost, self.__cred))
        channel = connection.channel()
        channel.queue_declare(queue=self.__queue)  # 큐 생성/ 접근
        return [connection, channel]

    # run when subscribe
    def subscribeCallback(self, ch, method, properties, body):

        print(" [x] Received %r" % body)

        print(signal)

    # subscribe
    def subscribe(self, channel):
        channel.basic_consume(queue=self.__queue,
                              auto_ack=True,
                              on_message_callback=self.subscribeCallback)

    # connect close
    def connect_close(self, connection):
        connection.close()

    # close camera
    def close_camera(self):
        print('[X] cam closed')
        self.__cap.release()
        cv2.destroyAllWindows()

    # open camera
    def capture(self):
        global signal
        self.__cap = cv2.VideoCapture(self.__camera_index)
        # 웹캠에서 프레임 읽기
        print('capcap', self.__cap)

        while self.__cap.isOpened():

            print(signal)
            ret, frame = self.__cap.read()
            if not ret:
                print('[X] no ret!')
                return

            # 1초 신호
            if signal:
                print('  [O]', time, self.__cap)

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

                signal = False

        print('[X] cam closed')
        self.__cap.release()
        cv2.destroyAllWindows()

    # main
    def main(self):
        print(f'[@] queue start!')
        [connection, channel] = self.connect_pika()
        self.subscribe(channel)

        try:
            thread = Process(target=self.capture)
            thread.start()

            # start subscribe
            print(' [*] Waiting for messages. To exit press CTRL+C')
            channel.start_consuming()

        finally:
            self.connect_close(connection)
