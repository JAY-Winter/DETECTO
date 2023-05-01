from main.tools.database import db

class Report(db.Model):
    __tablename__ = "report"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    time = db.Column(db.TIMESTAMP(6))
    x = db.Column(db.Integer,nullable=False)
    y = db.Column(db.Integer,nullable=False)

class ReportItem(db.Model):
    __tablename__ = "report_item"
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.Integer, nullable=False)
    report_id = db.Column(db.Integer, db.ForeignKey('report.id'))