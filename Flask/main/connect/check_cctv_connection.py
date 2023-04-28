from multiprocessing import Process
from .send_cctv_trigger_event import trigger_mq
from ..constants.constant import CCTV_MAX


# CCTV로부터 연결 요청 받음.
def check_connection(request, cctv_list):
    id = request.form['id']
    cctv_list.add(id)
    print(f'cctv {id} connected')

    # cctv 4대 연결 됐으면 트리거 시작
    if (check_connect_full(cctv_list)):
        print('full', cctv_list)
        thread = Process(target=trigger_mq)
        thread.start()

    return {"result": "CONNECT SUCCESS"}


# 연결된 CCTV가 4대 이상인지
def check_connect_full(cctv_list):
    return len(cctv_list) >= CCTV_MAX
