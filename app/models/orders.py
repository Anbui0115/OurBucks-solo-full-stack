
from app.models import items
from .db import db
# from flask_login import UserMixin

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    # Status options: not placed, placed, completed
    status=db.Column(db.String(50),nullable=False)

    #relationship
    user = db.relationship('User',back_populates='orders')
    order_items = db.relationship("OrderItem",back_populates='order')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'user_id': self.user.id,
            'status': self.status,
        }
