from .db import db


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
    # orders = db.relationship('Order',secondary=order_items,back_populates='items')
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

