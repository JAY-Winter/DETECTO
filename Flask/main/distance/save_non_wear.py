import os
import cv2
from datetime import datetime
from main.tools.cloud import cloud
from main.tools.database import db
from main.repository.repository import Report, ReportItem, Equipment

object_storage = cloud().client
object_storage.put_bucket_acl(Bucket="detec", ACL='public-read')

category = {
        "body" : 1,
        "arm" : 2,
        "hands" : 3,
        "face" : 4,
        "head": 5
    }
human_cls = [1001,1002,1003]
def save_non_wear(cctv_id,human_detect, yolo_image, real_image, face_model):
    equip = Equipment.query.all()
    current_time = datetime.utcnow()
    for human in human_detect:
        x1, y1, x2, y2 = tuple(map(int, human_detect[human][0][1:5]))
        # print(human_detect[human])
        non_wearing_class = human_detect[human]
    # 미착용자 DB에 저장
        if len(non_wearing_class) != 0:
            id = 0
            cls = -1
            # 위반자 누구인지 찾을겁니다
            cropped_imagex = real_image[y1:y2, x1:x2]
           
            cropped_image = cv2.resize(cropped_imagex,(640,640))
            # cropped_image = cv2.cvtColor(cropped_image,cv2.COLOR_RGB2GRAY)
            results = face_model(cropped_image, conf=0.6)
            if len(results[0].boxes) > 0 :
                cls = human_cls[int(results[0].boxes[0].cls.item())]
            

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
