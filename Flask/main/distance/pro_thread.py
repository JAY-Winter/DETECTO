import requests, cv2, datetime, os
from main.repository.repository import Equipment, ReportItem, Report
from main.tools.cloud import cloud
from main.app import app, db
from main.distance.save_non_wear import pro_queue

object_storage = cloud().client
object_storage.put_bucket_acl(Bucket="detec", ACL='public-read')

category = {
        "body" : 1,
        "arm" : 2,
        "hands" : 3,
        "face" : 4,
        "head": 5
    }

def doProcess():
    while True:
        with app.app_context():
            item = pro_queue.get()
            id = 0
            if item is None:
                continue
            equip = Equipment.query.all()
            current_time = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
            cctv_id,cls,non_wearing_class, real_image,cropped_image, yolo_image,x1, y1, x2, y2 = item
            base_url = 'http://k8d201.p.ssafy.io:8000/api/subscribe/send'
            path = str(cls)

            url = f'{base_url}/{path}'
            response = requests.get(url)
            print(response)
            new_report = Report(cctv_area=int(cctv_id),user_id=cls, time=current_time,
                                x=int(-10), y=int(-10))
            db.session.add(new_report)
            db.session.flush()

            id = new_report.id
            db.session.commit()

            # 위반 이미지 저장
            if cls == -1:
                filename = f"rh{id}.jpg"
                cv2.imwrite(filename, cropped_image)

            filename = f"{id}.jpg"
            cv2.imwrite(filename, yolo_image)
            local_file_path = os.path.abspath(filename)
            path = "report/" + str(id) + ".jpg"
            object_storage.upload_file(local_file_path, "detec", path, ExtraArgs={
                                        'ACL': 'public-read'})
            os.remove(local_file_path)
            # filename = f"{id}.jpg"
            cv2.imwrite(filename, real_image)

            # print(human_detect[human])
            filename = f"h{id}.jpg"
            
            cropped_image = yolo_image[y1:y2, x1:x2]
            cv2.imwrite(filename, cropped_image)
            local_file_path = os.path.abspath(filename)
            path = "report/" + filename
            object_storage.upload_file(local_file_path, "detec", path, ExtraArgs={
                                        'ACL': 'public-read'})
            os.remove(local_file_path)
            # os.remove(local_file_path)
            # 미착용 클래스 저장
            for i in range(len(non_wearing_class)):
                equip_name = equip[int(non_wearing_class[i][0])].name
                type = category[equip_name]
                result = db.session.query(Equipment).filter(Equipment.type == type, Equipment.able == 1).first()
                # print(equip_name)
                if not result:
                    continue
                new_report = ReportItem(
                    equipment_name=result.name, report_id=id)
                db.session.add(new_report)

            db.session.commit()