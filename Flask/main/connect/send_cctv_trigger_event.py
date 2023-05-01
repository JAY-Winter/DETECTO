#!/usr/bin/env python
import pika
import schedule
import time
from ..constants.constant import MESSAGE_QUEUE, CCTV_TRIGGER_TIME


class trigger_mq():
    def __init__(self):
        self.__url = MESSAGE_QUEUE['URL']
        self.__port = MESSAGE_QUEUE['PORT']
        self.__vhost = MESSAGE_QUEUE['VHOST']
        self.__cred = pika.PlainCredentials(
            MESSAGE_QUEUE['ID'], MESSAGE_QUEUE['PW'])
        self.__queue = MESSAGE_QUEUE['NAME']
        self.main()

    # connect to RabbitMQ
    def connect_pika(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters(
            self.__url, int(self.__port), self.__vhost, self.__cred))
        channel = connection.channel()
        channel.queue_declare(queue=self.__queue)  # 큐 생성/ 접근
        return [connection, channel]

    # message publish
    def publish(self, channel):
        now = time.time()

        channel.basic_publish(exchange='',                  # exchange를 거쳐 큐로 전송됨. default exchange는 빈 문자열
                              routing_key=self.__queue,     # routing key는 큐 이름
                              body=str(now))                # 전송 내역

        print(f"[x] Sent {now}")

    # connect close
    def connect_close(self, connection):
        connection.close()

    # main
    def main(self):
        print('[!] Trigger Start')
        [connection, channel] = self.connect_pika()

        # set schedule to publish per 1 second
        schedule.every(CCTV_TRIGGER_TIME).seconds.do(self.publish, channel)

        try:
            # publish per 1 second
            while True:
                schedule.run_pending()
                time.sleep(CCTV_TRIGGER_TIME)
        finally:
            self.connect_close(connection)
