import ntplib
import datetime
import time
import schedule

# NTP 서버 주소
ntp_server = 'pool.ntp.org'

# 마지막 업데이트 시간
last_update_time = 0

# 시간 캐시
cached_time = None

# 시간 정보 업데이트 함수
def update_time():
    global last_update_time
    global cached_time

    # 이전 업데이트 시간과 비교하여 주기적으로 업데이트
    current_time = time.time()
    if current_time - last_update_time > 300: # 300초 == 5분
        # NTP 서버와 연결
        client = ntplib.NTPClient()
        response = client.request(ntp_server)

        # NTP 시간
        ntp_time = response.tx_time

        # 로컬 시간
        local_time = time.time()

        # 로컬 클럭의 오차 계산
        offset = ntp_time - local_time

        # 로컬 클럭 조정
        adjusted_time = time.time() + offset

        # 시간 캐시 업데이트
        cached_time = datetime.datetime.fromtimestamp(adjusted_time)

        # 마지막 업데이트 시간 업데이트
        last_update_time = current_time

# 5분마다 시간 정보 업데이트
schedule.every(5).minutes.do(update_time)

while True:
    # 예약된 작업 실행
    schedule.run_pending()

    # 시간 캐시가 존재하는 경우, 캐시된 시간 출력
    if cached_time is not None:
        print('현재 시간:', cached_time)

    # 0.1초 대기
    time.sleep(0.1)