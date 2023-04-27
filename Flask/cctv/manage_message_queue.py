import pika
from camera import Camera
from multiprocessing import Process

class message_queue():
    def __init__(self, cctvNum, flaskUrl):
        # self.__url = 'k8d201.p.ssafy.io'
        # self.__url = '192.168.100.210'
        self.__url = '192.168.35.234'
        self.__port = 5672
        self.__vhost = '/'
        self.__cred = pika.PlainCredentials('guest', 'guest')
        self.__queue = 'hello'
        self.__camera = None
        self.__cctvNum = cctvNum
        self.__flaskUrl = flaskUrl

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
        self.__camera.capture(body)

    # subscribe
    def subscribe(self, channel):
        channel.basic_consume(queue=self.__queue,
                              auto_ack=True,
                              on_message_callback=self.subscribeCallback)

    # connect close
    def connect_close(self, connection):
        connection.close()

    # main
    def main(self):
        # run camera
        self.__camera = Camera(self.__cctvNum, self.__flaskUrl)
        thread = Process(target=self.__camera.main)
        thread.start()

        print(f'[@] queue start!')
        [connection, channel] = self.connect_pika()
        self.subscribe(channel)

        try:
            # start subscribe
            print(' [*] Waiting for messages. To exit press CTRL+C')
            channel.start_consuming()

        finally:
            self.connect_close(connection)
