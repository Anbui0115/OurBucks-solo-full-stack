from this import d
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


class OrderCustomizedItem(db.Model):
    __tablename__ = 'order_customized_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    customized_item_id = db.Column(db.Integer, db.ForeignKey("customized_items.id", ondelete="CASCADE"), nullable=False)

    #relationships
    order = db.relationship("Order", back_populates="order_customized_items")
    customized_item = db.relationship("CustomizedItem", back_populates="order_customized_items")


    def to_dict(self):
        return {
            'id': self.id,
            'itemId': self.item_id,
            'userId': self.user_id,
            'quantity': self.quantity,
            'price' : self.price,
            'review' : [i.to_dict() for i in self.reviews]
        }


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status=db.Column(db.String(20),nullable=False)
    # order_customized_items_id=db.Column(db.Integer, db.ForeignKey("order_customized_items.id",ondelete="CASCADE"),nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    #relationship
    customized_items = db.relationship("CustomizedItem",back_populates='order_customized_items')
    order_customized_items = db.relationship("OrderCustomizedItem",back_populates='order',secondary='order_customized_items')
    user = db.relationship('User',back_populates='orders')


    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'user_id': self.user.id,
            'status': self.status,
        }

class CustomizedItem(db.Model):
    __tablename__= 'customized_items'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id", ondelete="CASCADE"), nullable=False)
    milk = db.Column(db.String(30))
    syrup = db.Column(db.String(30))
    topping= db.Column(db.String(20))
    ice = db.Column(db.String(20))
    # customization_options = db.Column(db.ARRAY(db.Integer))
    # customization_options = db.Column(db.Integer, db.ForeignKey("customizations.id", ondelete="CASCADE"), nullable=False)

    #relationship
    user = db.relationship('User',back_populates='customized_item')
    item = db.relationship('Item',back_populates='customized_items')
    orders = db.relationship('Order', back_populates='customized_items')
    order_customized_items = db.relationship("OrderCustomizedItem",secondary='order_customized_items')
# class Item(db.Model):
#     __tablename__= 'items'
#     id = db.Column(db.Integer, primary_key=True,autoincrement=True)
#     name = db.Column(db.String(20), nullable=False)
#     calories = db.Column(db.Integer, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     description = db.Column(db.String(2000), nullable=False)
#     drink_category = db.Column(db.String(50), nullable=False)
#     image_url = db.Column(db.String(100),nullable=False)

#     #relationships
#     # orders = db.relationship('Order',secondary=order_items,back_populates='items')
#     customized_items = db.relationship('CustomizedItem',back_populates='item')
#     reviews = db.relationship('Review',back_populates='item')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             "calories":self.calories,
#             'price': self.price,
#             'description': self.description,
#             "drink_category":self.drink_category,
#             'image_url':self.image_url,

#         }
