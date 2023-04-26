import cv2
import requests
import time
import ntplib
from datetime import datetime

# CCTV 번호 (CCTV 별로 다르게 지정)
cctv_id = 0

# Server Url
url = "http://127.0.0.1:5000/upload"

# 동기화할 NTP 서버
ntp_server = "pool.ntp.org"

# sync time
def sync_time_with_ntp_server(ntp_server="pool.ntp.org"):
    ntp_client = ntplib.NTPClient()
    response = ntp_client.request(ntp_server)
    current_time = datetime.fromtimestamp(response.tx_time)
    return current_time

# 카메라 실행
def camera():
    # 웹캠에서 실시간 영상 캡처
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        # 웹캠에서 프레임 읽기
        ret, frame = cap.read()
        if not ret:
            break

        # 그레이 스케일
        # frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) 

        frame = cv2.resize(frame, (640, 480))

        # 프레임 이미지를 서버로 전송
        _, img_encoded = cv2.imencode('.jpg', frame)
        img_bytes = img_encoded.tobytes()
        files = {'file': ('image.jpg', img_bytes, 'image/jpeg')}

        data = {'id': cctv_id}
        response = requests.post(url, files=files, data=data)

        print(response)

        if response.status_code == 200:
            print('이미지 업로드 성공')
        else:
            print('이미지 업로드 실패')

        # 'q' 키를 누르면 종료
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        
        # 2초에 1프레임 전송 
        time.sleep(1)

    # 리소스 해제
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    # NTP 서버와 시간 동기화
    synced_time = sync_time_with_ntp_server(ntp_server)
    # 동기화된 시간 출력
    print(f"Synced time: {synced_time}")

    camera()