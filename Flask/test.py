import schedule
import time
import datetime
import pytz
import ntplib
from time import ctime

# NTP 서버 주소
ntp_server = 'pool.ntp.org'



#스케쥴 모듈이 동작시킬 코드 : 현재 시간 출력
def test_fuction():
    # NTP 서버와 연결
    client = ntplib.NTPClient()
    response = client.request(ntp_server)

    # POSIX 시간을 datetime 객체로 변환
    posix_time = datetime.datetime.utcfromtimestamp(response.tx_time)

    # 시, 분, 초, 밀리초 추출
    hour, minute, second = posix_time.hour, posix_time.minute, posix_time.second
    microsecond = posix_time.microsecond
    print(f'{hour}:{minute}:{second}.{microsecond}')

    # 시간 동기화
    ntp_time = ctime(response.tx_time)
    ntp_time_sec = response.tx_time
    ntp_time_ms = int(ntp_time_sec * 1000)
    print('NTP 시간: ', ntp_time, ntp_time_ms)
    
#1초마다 test_fuction을 동작시키자
schedule.every(1).seconds.do(test_fuction)

#무한 루프를 돌면서 스케쥴을 유지한다.
while True:
    schedule.run_pending()
    time.sleep(1)

# # 한국 시간대(Timezone)를 구합니다.
# kr_tz = pytz.timezone('Asia/Seoul')

# #스케쥴 모듈이 동작시킬 코드 : 현재 시간 출력
# def test_fuction():
#     # 현재 시간을 구합니다.
#     now = datetime.datetime.now(kr_tz)
#     print(now.strftime('%Y-%m-%d %H:%M:%S.%f'))
    
# #1초마다 test_fuction을 동작시키자
# schedule.every(1).seconds.do(test_fuction)

# #무한 루프를 돌면서 스케쥴을 유지한다.
# while True:
#     schedule.run_pending()
#     time.sleep(1)