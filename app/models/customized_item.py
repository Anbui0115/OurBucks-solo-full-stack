
from .db import db


class CustomizedItem(db.Model):
    __tablename__= 'customized_items'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(50),nullable=False)
    # customized_selection_id = db.Column(db.Integer, db.ForeignKey("customized_selections.id", ondelete="CASCADE"), nullable=False)


    #relationship
    order_items = db.relationship("OrderItem",back_populates='customized_item', cascade="all, delete")
    user = db.relationship('User',back_populates='customized_items')
    item = db.relationship('Item',back_populates='customized_items')
    customized_selections = db.relationship("CustomizedSelection", cascade="all, delete")
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "item_id": self.item_id,
            "name": self.name,
        }
