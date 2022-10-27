from this import s
from .db import db


class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    credit_number = db.Column(db.String(16),nullable=False)
    expiry_date = db.Column(db.String(5),nullable=False)
    security_number = db.Column(db.String(4),nullable=False)

    #relationship
    user = db.relationship('User',back_populates='cards')


    def to_dict(self):
        return{
            "id":self.id,
            "user_id":self.user_id,
            "credit_number":self.credit_number,
            "expiry_date":self.expiry_date,
            "security_number":self.security_number
        }
