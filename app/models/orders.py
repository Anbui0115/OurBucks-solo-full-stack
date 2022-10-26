from app.models import customized_items
from .db import db
# from flask_login import UserMixin


order_items = db.Table('order_items',db.Model.metadata,

    db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
    # db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),

    db.Column('item_id', db.Integer, db.ForeignKey('items.id'), primary_key=True,nullable=True),
    db.Column('customized_item_id', db.Integer, db.ForeignKey('customized_items.id'), primary_key=True,nullable=True),
    db.Column("quantity",db.Integer, nullable=False),

)


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status=db.Column(db.String(20),nullable=False)
    # quantity = db.Column(db.Integer, nullable=False)

    #relationship
    items = db.relationship("Item",secondary=order_items,back_populates='orders')

    user = db.relationship('User',back_populates='orders')


    # def to_dict(self):
    #     return {
    #         'id': self.id,
    #         'item': self.item.to_dict(),
    #         'user': self.user.to_dict(),
    #         'quantity': self.quantity
    #     }



class Item(db.Model):
    __tablename__= 'items'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    name = db.Column(db.String(20), nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    drink_category = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(100),nullable=False)

    #relationships
    orders = db.relationship('Order',secondary=order_items,back_populates='items')
    customized_items = db.relationship('CustomizedItem',back_populates='item')
    reviews = db.relationship('Review',back_populates='item')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            "calories":self.calories,
            'price': self.price,
            'description': self.description,
            "drink_category":self.drink_category,
            'image_url':self.image_url,

        }
