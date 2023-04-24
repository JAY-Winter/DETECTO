import cv2
import requests
import time

# CCTV 번호 (CCTV 별로 다르게 지정)
cctv_id = 1

# Server Url
url = "http://127.0.0.1:5000/upload_image"

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
        time.sleep(2)

    # 리소스 해제
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    camera()