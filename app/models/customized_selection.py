
from .db import db


class CustomizedSelection(db.Model):
    __tablename__= 'customized_selections'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    customization_id =db.Column(db.Integer, db.ForeignKey("customizations.id", ondelete="CASCADE"), nullable=False)
    customized_items_id = db.Column(db.Integer, db.ForeignKey("customized_items.id", ondelete="CASCADE"), nullable=False)


    #relationship
    customized_items= db.relationship('CustomizedItem',back_populates='customized_selection')

    customization = db.relationship("Customization",back_populates='customized_selection')

    # orders = db.relationship('Order', back_populates='customized_items')
