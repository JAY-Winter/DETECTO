#!/usr/bin/env python
import pika

__url = 'k8d201.p.ssafy.io'
__port = 5672
__vhost = '/'
__cred = pika.PlainCredentials('guest', 'guest')
__queue = 'cctv';

# RabbitMQ 서버에 연결
connection = pika.BlockingConnection(pika.ConnectionParameters(__url, __port, __vhost, __cred))
channel = connection.channel()

# 큐 생성
channel.queue_declare(queue=__queue)

# 절대 메시지 큐로 바로 전송하지 않음. exchange를 거쳐서 전송됨.
# default exchange는 빈 문자열
# routing_key는 큐 이름 적어주면 됨.
channel.basic_publish(exchange='',
                      routing_key=__queue,
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")

# 연결 종료
connection.close()