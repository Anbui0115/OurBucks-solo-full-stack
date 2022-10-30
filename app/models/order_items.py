from .db import db


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id", ondelete="CASCADE"), nullable=True)
    customized_item_id = db.Column(db.Integer, db.ForeignKey("customized_items.id", ondelete="CASCADE"), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)
    #relationships
    order = db.relationship("Order", back_populates="order_items")
    customized_item = db.relationship("CustomizedItem", back_populates="order_items")
    item = db.relationship("Item", back_populates="order_items")

    def to_dict(self):
        return {
            'id': self.id,
            'itemId': self.item_id,
            'orderId': self.order_id,
            'quantity': self.quantity,
            'customized_item_id': self.customized_item_id,
        }
