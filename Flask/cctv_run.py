import requests
from main.cctv.manage_message_queue import message_queue
from main.constants.constant import FLASK_URL, CCTV_NUMBER


class CCTV():
    def __init__(self):
        self.__cctvNum = CCTV_NUMBER
        self.__flaskUrl = FLASK_URL

    def startRequest(self):
        data = {'id': self.__cctvNum}
        response = requests.post(self.__flaskUrl + '/connect', data=data)
        if (response.status_code == 200):
            print('서버 연결 성공', response)
            # mq 대기
            mq = message_queue()
            mq.main()
        else:
            print('서버 연결 실패', response.status_code)

    def main(self):
        # 서버로 연결 요청
        self.startRequest()


if __name__ == '__main__':
    cctv = CCTV()
    cctv.main()
