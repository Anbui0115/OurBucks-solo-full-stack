
from .db import db


class CustomizedSelection(db.Model):
    __tablename__= 'customized_selections'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    customization_id =db.Column(db.Integer, db.ForeignKey("customizations.id", ondelete="CASCADE"), nullable=False)
    customized_item_id = db.Column(db.Integer, db.ForeignKey("customized_item.id", ondelete="CASCADE"), nullable=False)


    #relationship
    customized_item= db.relationship('CustomizedItem',foreign_keys=[customized_item_id])

    customization = db.relationship("Customization",foreign_keys=[customization_id])

    # orders = db.relationship('Order', back_populates='customized_items')
