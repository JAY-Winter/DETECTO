from main.tools.database import db
from sqlalchemy import ForeignKey


class Report(db.Model):
    __tablename__ = "reports"
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, name='user_id',nullable=False)
    time = db.Column(db.BigInteger, nullable=False)
    url = db.Column(db.String(64), nullable=False)
