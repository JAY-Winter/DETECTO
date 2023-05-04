from main.tools.database import db


class Report(db.Model):
    __tablename__ = "report"
    id = db.Column(db.Integer, primary_key=True)
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
    user_image = db.Column(db.String(255), nullable=True)
    user_name = db.Column(db.String(255), nullable=True)
    user_team = db.Column(db.Integer, nullable=True)


class Equipment(db.Model):
    __tablename__ = 'equipment'
    name = db.Column(db.String(255), primary_key=True, nullable=True)
