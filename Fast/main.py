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
import asyncio

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
async def consume_message(websocket, consumer, topic, partition):
    flag = False
    start_offset = 0
    while True: 
        print(1)
        partition_list = [TopicPartition(topic, partition)]
        print(2)
        print(3)
        total_offsets  = consumer.end_offsets(partition_list)[partition_list[0]] - 1
        consumer.assign(partition_list)
        print(4)
        if flag:
            flag = False
            if start_offset >= total_offsets:
                start_offset = total_offsets
        else:
            start_offset = total_offsets
        print(start_offset)
        consumer.seek(partition_list[0], start_offset)
        message = consumer.poll(timeout_ms=3000)
        print(6)
        if not message:
            # await websocket.send_text("No message in partition")
            await asyncio.sleep(1) 
            continue
        try:
            for message in consumer:
                if not message:
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
                    print("여기서 멈추나요?")
                    received_data = await asyncio.wait_for(websocket.receive_text(), timeout=0.1)
                    print("여기서 멈추나요?22")

                    # received_data = await websocket.receive_text()
                    print(received_data)
                    if not received_data:
                        continue
                    try:
                        received_data = json.loads(received_data)
                    except Exception as e:
                        print('error', e)

                    new_offset = received_data['offset']

                    if start_offset != new_offset:
                        start_offset = new_offset
                        flag = True
                        print('v')   
                        break
                    
                    elif new_offset == total_offsets:
                        print('new offset == total offsets')
                        start_offset = 0
                        break
                    elif message.offset == total_offsets:
                        print('message offset == total_offsets')
                        start_offset = 0
                        break
                except asyncio.CancelledError:
                    print("WebSocket connection closed")
                    break
                except asyncio.TimeoutError:
                        continue
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
    
################################################################
@app.websocket("/fast")
async def websocket_endpoint(websocket: WebSocket, cctvnumber: int, partition: int):
    await websocket.accept()
    print("ddddddd1")
    # manager = Manager()
    # total_offsets = manager.dict()
    # total_offsets[partition] = get_total_offset(cctvnumber=cctvnumber ,partition=partition)
    print("ddddddd2")

    # p = Process(target=get_total_offset, args=(cctvnumber ,partition, total_offsets))
    print("ddddddd3")
    p.start()
    print("ddddddd4")

    consumer = KafkaConsumer(
        bootstrap_servers=['k8d201.p.ssafy.io:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=False,
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        group_id='cctv_consumer'
    )
    year = 23
    topic = f'cctv.{cctvnumber}.{year}'
    print(topic)
    try:
        print("ddddddd")
        await consume_message(websocket, consumer, topic, partition)
        print("ddddddd")
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