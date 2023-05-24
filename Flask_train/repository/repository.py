from tools.database import db

class Equipment(db.Model):
    __tablename__ = 'equipment'
    name = db.Column(db.String(255), primary_key=True)
    type = db.Column(db.Integer, nullable=False)
    able = db.Column(db.Integer, nullable=False)
    training = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)

