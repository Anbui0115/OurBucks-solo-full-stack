
from .db import db


class CustomizedItem(db.Model):
    __tablename__= 'customized_items'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(50))
    # customized_selection_id = db.Column(db.Integer, db.ForeignKey("customized_selections.id", ondelete="CASCADE"), nullable=False)


    #relationship
    order_items = db.relationship("OrderItem",back_populates='customized_items')
    user = db.relationship('User',back_populates='customized_item')
    item = db.relationship('Item',back_populates='customized_items')

    # customized_selection = db.relationship("CustomizedSelection",back_populates='customized_items')
    # orders = db.relationship('Order', back_populates='customized_items')
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "item_id": self.item_id,
            "name": self.name,
        }
        
