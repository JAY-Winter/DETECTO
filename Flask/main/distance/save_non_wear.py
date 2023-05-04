import os
import cv2
from datetime import datetime
from main.tools.cloud import cloud
from main.tools.database import db
from main.repository.repository import Report, ReportItem, Equipment


def save_non_wear(img_length, non_wearing_class, mean_coord, yolo_images):

    current_time = datetime.utcnow()

    # 미착용자 DB에 저장
    if len(non_wearing_class) != 0:
        id = 0
        # 위반 위치 레포트 저장
        new_report = Report(user_id=-1, time=current_time,
                            x=int(mean_coord[0]), y=int(mean_coord[1]))
        db.session.add(new_report)
        db.session.flush()

        id = new_report.id
        db.session.commit()

        # 위반 이미지 저장
        object_storage = cloud().client
        object_storage.put_bucket_acl(Bucket="detec", ACL='public-read')

        for i in range(1, img_length + 1):
            print('+++', i)
            filename = f"{id}_{i}.jpg"
            cv2.imwrite(filename, yolo_images[i - 1])
            local_file_path = os.path.abspath(filename)
            path = "report/" + str(id) + "/" + str(i) + ".jpg"
            print(path)
            object_storage.upload_file(local_file_path, "detec", path, ExtraArgs={
                                       'ACL': 'public-read'})

        # 미착용 클래스
        equip = Equipment.query.all()
        print(equip)
        # 미착용 클래스 저장
        for i in range(len(non_wearing_class)):
            equip_name = equip[non_wearing_class[i]].name
            print('----', non_wearing_class[i], equip_name)
            new_report = ReportItem(
                equipment_name=equip_name, report_id=id)
            db.session.add(new_report)

        db.session.commit()
