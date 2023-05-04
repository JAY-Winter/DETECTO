from collections import Counter, deque

# pro: 미착용 클래스 번호
# lists: 이미지 4장의 YOLO 결과 감지 클래스

DETECT_TIME = 5     # 연속된 5초 동안
DETECT_COUNT = 3    # 동일 클래스가 3번 이상 감지되면 미착용 판단

dq = deque()        # 5초 간 감지 결과들을 리스트로 저장
sum_dict = dict()   # 5초 간 각 클래스별 감지 개수


# 미착용 감지 로직
def detect_non_wearing(pro, lists):
    global sum_dict
    non_wearing_class = []

    print('################################################')
    print(f'[%] 검출 결과: {lists}')  # [tensor([7., 2.], device='cuda:0')]

    # 1. 4대 set으로 합치기
    no_wear = set()
    for detected_list in lists:                 # 이미지 한 장씩
        # 빈 배열 return
        if len(detected_list) <= 0:
            continue
        for i in range(len(detected_list)):     # 이미지의 감지 클래스 하나씩
            detected_class = int(detected_list[i].item())
            if detected_class in pro:
                no_wear.add(detected_class)

    # 2. queue에 삽입
    dq.append(no_wear)
    print(f'[%] Queue: ', list(dq))

    # 3. 합계 dict에 더하기
    for key in no_wear:
        sum_dict[key] = sum_dict.get(key, 0) + 1
    print(f'[%] Sum: {sum_dict}')

    # 4. queue 길이 5 이상이면 검증
    if len(dq) >= DETECT_TIME:
        # 5. 각 미착용 클래스 중 3개 이상이면 경보
        for key in sum_dict.keys():
            if key in pro and sum_dict[key] >= DETECT_COUNT:
                print('[%]          alarm!!!!!! class 번호: ',
                      key, ' - 횟수: ', sum_dict[key])
                non_wearing_class.append(key)

        # 6. queue pop
        pop = dq.popleft()
        print(f'[%]     Queue: ', list(dq))

        # 7. 합계 list에서 빼기
        for key in pop:
            sum_dict[key] -= 1
        print(f'[%]     Sum: {sum_dict}')

    # 미착용 리스트 반환
    return non_wearing_class
