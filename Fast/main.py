import cv2
import json
import base64
import asyncio
import numpy as np
from typing import Optional

from fastapi import FastAPI
from kafka import KafkaConsumer
from multiprocessing import Process, Manager, Queue
from kafka import KafkaConsumer, TopicPartition
from fastapi.middleware.cors import CORSMiddleware
from websockets.exceptions import ConnectionClosedError
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from kafka.errors import KafkaError
import asyncio
from starlette.websockets import WebSocketState


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
async def consume_message(websocket, consumer, topic, partition, queue):
    start_offset = 0
    while websocket.application_state == WebSocketState.CONNECTED:
        print(queue)
        partition_list = [TopicPartition(topic, partition)]
        total_offsets = consumer.end_offsets(partition_list)[partition_list[0]] - 1
        consumer.assign(partition_list)
        consumer.seek(partition_list[0], start_offset)
        message = consumer.poll(timeout_ms=2000)

        if not message:
            print('not message')
            await websocket.send_text("No message in partition")
            break

        for message in consumer:
            if message.offset == total_offsets:
                start_offset = 0
                break
            # print('offset', message.offset)
            if not message:
                print('not message')
                start_offset = 0
                break
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

            if not queue.empty():
                received_data = await queue.get()
                print('received data', received_data)
#           

        start_offset = 0
        print('while end')


async def receive_messages(websocket, queue):
    while websocket.application_state == WebSocketState.CONNECTED:
        print('seconds',websocket)
        # try:
        message = await websocket.receive_text()
        print(message)
        await queue.put(message)
        # except WebSocketDisconnect:
            # print('websocket disconnect')
            # break

################################################################
@app.websocket("/fast")
async def websocket_endpoint(websocket: WebSocket, cctvnumber: int, partition: int):
    await websocket.accept()
    print('first',websocket)
    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        group_id='cctv_consumer'
    )
    year = 23
    topic = f'cctv.{cctvnumber}.{year}'
    
    queue = asyncio.Queue()
    receive_task = asyncio.create_task(receive_messages(websocket, queue))
    consume_task = asyncio.create_task(consume_message(websocket, consumer, topic, partition, queue))
    
    print('gather')
    await asyncio.gather(receive_task, consume_task)
    print('들어오나용')
    # all_tasks = asyncio.all_tasks()

    # for task in all_tasks:
    #     print('task:', task)
    # await consume_message(websocket, consumer, topic, partition, queue)
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





################################################################
# def get_total_offset(cctvnumber:int, partition: Optional[int] = None, return_dict: dict = None):
#     consumer = KafkaConsumer(
#         bootstrap_servers=['k8d201.p.ssafy.io:9092'],
#         auto_offset_reset='earliest',
#         enable_auto_commit=False,
#         value_deserializer=lambda x: json.loads(x.decode('utf-8')),
#         group_id='cctv_consumer'
#     )

#     year = 23
#     topic = f'cctv.{cctvnumber}.{year}'
#     partition_list = [TopicPartition(topic, partition)]
    
#     end_offsets: dict = consumer.end_offsets([partition_list[0]])
#     for _, val in end_offsets.items():
#         # return_dict[partition] = val
#         return val