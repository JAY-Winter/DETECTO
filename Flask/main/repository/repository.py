from main.tools.database import db


class Report(db.Model):
    __tablename__ = "report"
    id = db.Column(db.Integer, primary_key=True)
    cctv_area = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    time = db.Column(db.TIMESTAMP(6))
    x = db.Column(db.Integer, nullable=False)
    y = db.Column(db.Integer, nullable=False)


class ReportItem(db.Model):
    __tablename__ = "report_item"
    id = db.Column(db.Integer, primary_key=True)
    equipment_name = db.Column(db.String(255), db.ForeignKey(
        'equipment.name'), nullable=False)
    report_id = db.Column(db.Integer, db.ForeignKey('report.id'))


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(255), nullable=True)
    image = db.Column(db.String(255), nullable=True)
    name = db.Column(db.String(255), nullable=True)
    team = db.Column(db.Integer, nullable=True)
    fcm_token = db.Column(db.String(255), nullable=True)
    session_id = db.Column(db.String(255), nullable=True)
    type = db.Column(db.String(255), nullable=True)
    theme = db.Column(db.String(255), nullable=True)


class Equipment(db.Model):
    __tablename__ = 'equipment'
    name = db.Column(db.String(255), primary_key=True, nullable=True)
    type = db.Column(db.Integer, nullable=True)
    able = db.Column(db.Integer, nullable=True)
    training = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String(255), nullable=True)
    url = db.Column(db.String(255), nullable=True)