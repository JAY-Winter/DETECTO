#!/usr/bin/env python
import pika
import schedule
import time


class trigger_mq():
    def __init__(self):
        # self.__url = 'k8d201.p.ssafy.io'
        self.__url = '192.168.100.210'
        self.__port = 5672
        self.__vhost = '/'
        self.__cred = pika.PlainCredentials('guest', 'guest')
        self.__queue = 'hello'
        self.main()

    # connect to RabbitMQ
    def connect_pika(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(
            self.__url, self.__port, self.__vhost, self.__cred))
        channel = connection.channel()
        channel.queue_declare(queue=self.__queue)  # 큐 생성/ 접근
        return [connection, channel]

    # message publish
    def publish(self, channel, body):
        channel.basic_publish(exchange='',              # exchange를 거쳐 큐로 전송됨. default exchange는 빈 문자열
                              routing_key=self.__queue,   # routing key는 큐 이름
                              body=body)                  # 전송 내역
        print(f" [x] Sent {body}")

    # connect close
    def connect_close(self, connection):
        connection.close()

    # main
    def main(self):
        print('[!] Trigger Start')
        [connection, channel] = self.connect_pika()

        # set schedule to publish per 1 second
        schedule.every(1).seconds.do(self.publish, channel, "True")

        try:
            # publish per 1 second
            while True:
                schedule.run_pending()
                time.sleep(1)
        finally:
            self.connect_close(connection)
