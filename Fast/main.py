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
import logging

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
        logger.info(message)


################################################################
async def consume_message(websocket, consumer, topic, partition):
    start_offset = 0
    logger.info("여기옵니다")
    partition_list = [TopicPartition(topic, partition)]
    consumer.assign(partition_list)
    logger.info("여기옵니다")
    while websocket.application_state == WebSocketState.CONNECTED:
        total_offsets = consumer.end_offsets(partition_list)[partition_list[0]] - 1
        logger.info(f"여기옵니다 start_offset : {start_offset} total_offsets : {total_offsets}")
        consumer.seek(partition_list[0], start_offset)
        message = consumer.poll(timeout_ms=2000)
        isSend = False
        if not message:
            logger.info('not message')
            await websocket.send_text("No message in partition")
            break

        for message in consumer:
            if not message:
                logger.info('not message')
                start_offset = 0
                break
            if message.offset == total_offsets - 1:
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

            try:
                message = await asyncio.wait_for(websocket.receive_text(), timeout=0.05)
                if message:
                    message = json.loads(message)
                    new_offset = message.get('offset')
                    new_offset = min(new_offset,total_offsets)
                    start_offset = new_offset
                    isSend = True
                    break
            except asyncio.TimeoutError:
                continue

        if isSend:
            continue
        else:
            start_offset = total_offsets

################################################################
@app.websocket("/fast")
async def websocket_endpoint(websocket: WebSocket, cctvnumber: int, partition: int):
    await websocket.accept()

    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        group_id='cctv_consumer'
    )
    year = 23
    topic = f'cctv.{cctvnumber}.{year}'
    logger.info(topic)
    await consume_message(websocket, consumer, topic, partition)
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