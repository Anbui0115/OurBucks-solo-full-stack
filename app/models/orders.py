
from app.models import items
from .db import db
# from flask_login import UserMixin


# order_customized_items = db.Table('order_customized_items',db.Model.metadata,
#     db.Column('id' ,db.Integer, primary_key=True),
#     db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
#     # db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),

#     # db.Column('item_id', db.Integer, db.ForeignKey('items.id'), primary_key=True,nullable=True),
#     db.Column('customized_item_id', db.Integer, db.ForeignKey('customized_items.id'), primary_key=True),
#     # db.Column("quantity",db.Integer, nullable=False),
#     # db.relationship("customized_items", db.relationship("CustomizedItem",back_populates='order_item'))
# )



class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status=db.Column(db.String(20),nullable=False)
    # order_customized_items_id=db.Column(db.Integer, db.ForeignKey("order_customized_items.id",ondelete="CASCADE"),nullable=False)

    #relationship
    user = db.relationship('User',back_populates='orders')
    order_items = db.relationship("OrderItem",back_populates='order')


    # customized_items = db.relationship("CustomizedItem",back_populates='order_customized_items')


    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'user_id': self.user.id,
            'status': self.status,
        }
