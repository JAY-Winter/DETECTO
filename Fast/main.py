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

################################################################
def get_total_offset(partition: Optional[int] = None, return_dict: dict = None):
    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
    )
    topic = 'cctvs'
    partition_list = [TopicPartition(topic, partition)]
    
    end_offsets: dict = consumer.end_offsets([partition_list[0]])
    for _, val in end_offsets.items():
        # return_dict[partition] = val
        return val
    
################################################################
@app.websocket("/ws/{partition}")
async def websocket_endpoint(websocket: WebSocket, partition: int):
    await websocket.accept()

    manager = Manager()
    total_offsets = manager.dict()
    total_offsets[partition] = get_total_offset(partition=partition)

    p = Process(target=get_total_offset, args=(partition, total_offsets))
    p.start()

    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        group_id=None
    )
    topic = 'cctvs'
    try:
        await consume_message(websocket, consumer, topic, partition, total_offsets)
    except Exception as e:
        print(e)
    p.join()
    await websocket.close()

################################################################
@app.get("/max_offset")
async def get_max_offset(partition: Optional[int] = None):
    loop = asyncio.get_running_loop()

    def run_in_executor(partition):
        consumer = KafkaConsumer(
            bootstrap_servers=['k8d201.p.ssafy.io:9092'],
            value_deserializer=lambda x: json.loads(x.decode('utf-8')),
            group_id=None  # group_id를 None으로 설정합니다.
        )

        topic = 'cctvs'
        partitions = consumer.partitions_for_topic(topic)
        partition_list = [TopicPartition(topic, p) for p in sorted(list(partitions))]

        if partition is not None and partition not in partitions:
            return {"error": f"Partition {partition} does not exist for topic {topic}"}

        partition_offsets = {}
        for p in partition_list:
            if partition is None or p.partition == partition:
                partition_end_offset = consumer.end_offsets([p])[p]
                partition_offsets[p.partition] = partition_end_offset

        return {"offsets": partition_offsets}

    result = await loop.run_in_executor(None, run_in_executor, partition)
    return result
