import cv2
import requests
import time
import pika


class camera():
    def __init__(self):
        # self.__url = 'k8d201.p.ssafy.io'
        self.__url = '192.168.100.210'
        self.__port = 5672
        self.__vhost = '/'
        self.__cred = pika.PlainCredentials('guest', 'guest')
        self.__queue = 'hello'
        # self.__cctvNum = 1
        # self.__flaskUrl = "http://127.0.0.1:5000/upload"
        return

    # connect to RabbitMQ
    def connect_pika(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(
            self.__url, self.__port, self.__vhost, self.__cred))
        channel = connection.channel()
        channel.queue_declare(queue=self.__queue)  # 큐 생성/ 접근
        return [connection, channel]

    # run when subscribe
    def subscribeCallback(self, ch, method, properties, body):
        print(" [x] Received %r" % body)
        # 이미지 전송

    # subscribe
    def subscribe(self, channel):
        channel.basic_consume(queue=self.__queue,
                              auto_ack=True,
                              on_message_callback=self.subscribeCallback)

    # connect close
    def connect_close(self, connection):
        connection.close()

    # open camera
    def camera(self):
        # 웹캠에서 실시간 영상 캡처
        cap = cv2.VideoCapture(0)

        while cap.isOpened():
            # 웹캠에서 프레임 읽기
            ret, frame = cap.read()
            if not ret:
                break

            frame = cv2.resize(frame, (640, 480))

            # 프레임 이미지를 spring 서버로 전송
            _, img_encoded = cv2.imencode('.jpg', frame)
            img_bytes = img_encoded.tobytes()
            files = {'file': ('image.jpg', img_bytes, 'image/jpeg')}

            data = {'id': self.__cctvNum}
            response = requests.post(self.__flaskUrl, files=files, data=data)

            print(response)

            if response.status_code == 200:
                print('이미지 업로드 성공')
            else:
                print('이미지 업로드 실패')

            # 'q' 키를 누르면 종료
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

            # 2초에 1프레임 전송
            time.sleep(1)

        # 리소스 해제
        cap.release()
        cv2.destroyAllWindows()

    # main
    def main(self):
        [connection, channel] = self.connect_pika()
        self.subscribe(channel)

        try:
            # 4대 연결됨?

            # 구독 시작
            print(' [*] Waiting for messages. To exit press CTRL+C')
            channel.start_consuming()

            # 신호 받을 때마다 서버로 이미지 전송

        finally:
            self.connect_close(connection)


mq = camera()
mq.main()
