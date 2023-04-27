#!/usr/bin/env python
import pika, sys, os

__url = 'http://k8d201.p.ssafy.io'
__port = 15672
__vhost = '/'
__cred = pika.PlainCredentials('guest', 'guest')
__queue = 'hello'; 

def main():
  # RabbitMQ 서버에 연결
  connection = pika.BlockingConnection(pika.ConnectionParameters(__url, __port, __vhost, __cred))
  channel = connection.channel()

  # 큐 생성
  channel.queue_declare(queue=__queue)

  # 구독할 때마다 실행됨
  def callback(ch, method, properties, body):
      print(" [x] Received %r" % body)

  # 구독할 큐 정의
  channel.basic_consume(queue=__queue,
                        auto_ack=True,
                        on_message_callback=callback)
  
  # 큐 구독 시작
  print(' [*] Waiting for messages. To exit press CTRL+C')
  channel.start_consuming()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)