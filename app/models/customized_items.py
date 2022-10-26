from .db import db


class CustomizedItem(db.Model):
    __tablename__= 'customized_items'
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id", ondelete="CASCADE"), nullable=False)
    # customization_options = db.Column(db.ARRAY(db.Integer))
    customization_options = db.Column(db.Integer, db.ForeignKey("customizations.id", ondelete="CASCADE"), nullable=False)

    #relationship
    user = db.relationship('User',back_populates='customized_item')
    item = db.relationship('Item',back_populates='customized_items')
