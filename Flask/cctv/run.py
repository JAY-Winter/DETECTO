import requests


class CCTV():
    def __init__(self):
        self.__cctvNum = 1
        self.__flaskUrl = "http://127.0.0.1:5000"

    def startRequest(self):
        data = {'id': self.__cctvNum}

        response = requests.post(self.__flaskUrl + '/connect', data=data)
        if (response.status_code == 200):
            print('서버 연결 성공', response)
        else:
            print('서버 연결 실패', response.status_code)

    def main(self):
        self.startRequest()


if __name__ == '__main__':
    cctv = CCTV()
    cctv.main()
