from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id", ondelete="CASCADE"), nullable=False)
    star_rating = db.Column(db.Integer,nullable=False)
    review_details = db.Column(db.String(50))
    #relationship
    user = db.relationship('User',back_populates='reviews')
    item = db.relationship('Item',back_populates='reviews')
