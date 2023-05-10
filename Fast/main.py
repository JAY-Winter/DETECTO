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


app = FastAPI()

# CORS 설정
origins = [
    "http://localhost",
    "http://localhost:7001",
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

################################################################
async def consume_message(websocket, consumer, topic, partition, total_offsets):
    start_offset = 0 
    partition_list = [TopicPartition(topic, partition)]
    total_offsets = total_offsets[partition]
    while True:
        consumer.assign(partition_list)
        consumer.seek(partition_list[0], start_offset)
        try:
            for message in consumer:
                data = message.value
                frame_encoded = encoding(data)
                context = {
                    'frame': frame_encoded,
                    'total': total_offsets,
                    'offset': message.offset,
                    'timestamp': message.timestamp,
                }
                context = json.dumps(context)
                await websocket.send_text(context)
                try:
                    received_data = await websocket.receive_text()  
                    received_data = json.loads(received_data)
                    
                    new_offset = received_data['offset']
                    if start_offset != new_offset:
                        start_offset = new_offset   
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
        except WebSocketDisconnect:
            print("WebSocket disconnected.")
            break
        except ConnectionClosedError:
            print('Connection closed')
            break
        except json.JSONDecodeError as e:
            print(f"Invalid JSON string: {e}")
            break

################################################################
def get_total_offset(cctvnumber:int, partition: Optional[int] = None, return_dict: dict = None):
    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
    )
    year = 23
    topic = f'cctv.{cctvnumber}.{year}'
    partition_list = [TopicPartition(topic, partition)]
    
    end_offsets: dict = consumer.end_offsets([partition_list[0]])
    for _, val in end_offsets.items():
        # return_dict[partition] = val
        return val
    
################################################################
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, cctvnumber: int, partition: int):
    await websocket.accept()

    manager = Manager()
    total_offsets = manager.dict()
    total_offsets[partition] = get_total_offset(cctvnumber=cctvnumber ,partition=partition)

    p = Process(target=get_total_offset, args=(partition, total_offsets))
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
    p.join()
    await websocket.close()

################################################################
@app.get("/ws/max_offset")
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