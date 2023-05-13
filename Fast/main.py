import cv2
import json
import base64
import asyncio
import numpy as np
from typing import Optional

from fastapi import FastAPI
from kafka import KafkaConsumer
from multiprocessing import Process, Manager
from kafka import KafkaConsumer, TopicPartition
from fastapi.middleware.cors import CORSMiddleware
from websockets.exceptions import ConnectionClosedError
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from kafka.errors import KafkaError

app = FastAPI()

# CORS 설정
origins = [
    'localhost:5173',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

################################################################
def encoding(data):
    frame_base64 = data['frame']
    frame_bytes = base64.b64decode(frame_base64)
    frame = cv2.imdecode(np.frombuffer(
        frame_bytes, np.uint8), cv2.IMREAD_COLOR)
    _, buffer = cv2.imencode('.jpg', frame)
    frame_encoded = base64.b64encode(buffer).decode('utf-8')
    return frame_encoded

class NoMessageError(Exception):
    message = ""

    def __init__(self, message):
        self.message = message
        print(message)


################################################################
async def consume_message(websocket, consumer, topic, partition, total_offsets):
    start_offset = 0
    try:     
        partition_list = [TopicPartition(topic, partition)]
        total_offsets = total_offsets[partition]
        print(partition_list)
    except KafkaError as e:
        print(e)

    while True: 
        print('while')
        consumer.assign(partition_list)
        consumer.seek(partition_list[0], start_offset)
        message = consumer.poll(timeout_ms=2000)
        if not message:
            await websocket.send_text("No message in partition")
            break
        try:
            # message = consumer.poll(timeout_ms=1000) # 이 줄은 제거합니다.
            for message in consumer:
                print('cnsume')
                data = message.value
                print('1')
                frame_encoded = encoding(data)
                print('2')
                context = {
                    'frame': frame_encoded,
                    'total': total_offsets,
                    'offset': message.offset,
                    'timestamp': message.timestamp,
                }
                print(3)
                context = json.dumps(context)
                print(7)
                await websocket.send_text(context)
                print(8)
                try:
                    print('r')
                    received_data = await websocket.receive_text()
                    print(received_data)
                    if not received_data:
                        continue
                    print('s')  
                    try:
                        received_data = json.loads(received_data)
                    except Exception as e:
                        print('error', e)
                    print('e')
                    new_offset = received_data['offset']
                    print('a')
                    if start_offset != new_offset:
                        start_offset = new_offset
                        print('v')   
                        break
                    
                    elif new_offset == total_offsets - 1:
                        print('new offset == total offsets')
                        start_offset = 0
                        
                        break
                    elif message.offset == total_offsets - 1:
                        print('message offset == total_offsets')
                        start_offset = 0
                        break
                except asyncio.CancelledError:
                    print("WebSocket connection closed")
                    break
                
                print(9)
        except WebSocketDisconnect:
            print("WebSocket disconnected.")
            break
        except ConnectionClosedError:
            print('Connection closed')
            break
        except json.JSONDecodeError as e:
            print(f"Invalid JSON string: {e}")
            break
        except Exception as e:
            # 기타 예외 처리 (모든 예외를 포괄하는 경우)
            # 처리할 작업을 수행합니다.
            print(e)
            break
        print(10)

################################################################
def get_total_offset(cctvnumber:int, partition: Optional[int] = None, return_dict: dict = None):
    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        group_id='cctv_consumer'
    )

    year = 23
    topic = f'cctv.{cctvnumber}.{year}'
    partition_list = [TopicPartition(topic, partition)]
    
    end_offsets: dict = consumer.end_offsets([partition_list[0]])
    for _, val in end_offsets.items():
        # return_dict[partition] = val
        return val
    
################################################################
@app.websocket("/fast")
async def websocket_endpoint(websocket: WebSocket, cctvnumber: int, partition: int):
    await websocket.accept()

    manager = Manager()
    total_offsets = manager.dict()
    total_offsets[partition] = get_total_offset(cctvnumber=cctvnumber ,partition=partition)

    p = Process(target=get_total_offset, args=(cctvnumber ,partition, total_offsets))
    p.start()

    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        group_id='cctv_consumer'
    )
    year = 23
    topic = f'cctv.{cctvnumber}.{year}'
    try:
        await consume_message(websocket, consumer, topic, partition, total_offsets)
    except Exception as e:
        print(e)
    # p.join()
    await websocket.close()

################################################################
@app.get("/fast/max_offset")
async def get_max_offset(cctvnumber: int, partition: int):
    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        group_id='get_max_offset'  # group_id를 None으로 설정합니다.
    )
    year = 23
    topic = f'cctv.{cctvnumber}.{year}'
    tp = TopicPartition(topic, partition)
    consumer.assign([tp])
    consumer.seek_to_end(tp)
    end_offset = consumer.position(tp)
    return {"offsets": end_offset}