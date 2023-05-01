import pika
from main.cctv.camera import Camera
from multiprocessing import Process, Value
from main.constants.constant import FLASK_URL, CCTV_NUMBER, MESSAGE_QUEUE


class message_queue():
    def __init__(self):
        self.__url = MESSAGE_QUEUE['URL']
        self.__port = MESSAGE_QUEUE['PORT']
        self.__vhost = MESSAGE_QUEUE['VHOST']
        self.__cred = pika.PlainCredentials(
            MESSAGE_QUEUE['ID'], MESSAGE_QUEUE['PW'])
        self.__queue = MESSAGE_QUEUE['NAME']
        self.__camera = None
        self.__cctvNum = CCTV_NUMBER
        self.__flaskUrl = FLASK_URL

    def connect_pika(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(
            self.__url, self.__port, self.__vhost, self.__cred))
        channel = connection.channel()
        channel.queue_declare(queue=self.__queue)
        return [connection, channel]

    def subscribeCallback(self, ch, method, properties, body):
        print("[@] Received %r" % body)
        signal = self.__camera.signal  # getter 메서드 사용하여 signal 변수 가져오기
        with signal.get_lock():  # 가져온 signal 변수에 대해 get_lock() 호출
            signal.value = True

    def subscribe(self, channel):
        channel.basic_consume(queue=self.__queue,
                              auto_ack=True,
                              on_message_callback=self.subscribeCallback)

    def connect_close(self, connection):
        connection.close()

    def main(self):
        print(f'[@] queue start!')

        try:
            print('[*] Waiting for messages. To exit press CTRL+C')
            shared_signal = Value('b', False)
            self.__camera = Camera(shared_signal)

            camera_process = Process(target=self.__camera.main)
            camera_process.start()

            [connection, channel] = self.connect_pika()
            self.subscribe(channel)
            channel.start_consuming()

        finally:
            self.connect_close(connection)
            camera_process.terminate()
