from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError
from wtforms import validators

class AddReview(FlaskForm):
    # star_rating = IntegerField('Star Rating')
    # review_details = StringField('Review Details')
    # item_id = IntegerField("Item ID")
    # user_id = IntegerField('User ID')
    # star_rating = IntegerField('Star Rating',validators=[validators.input_required()])
    # review_details = StringField('Review Details',validators=[validators.input_required()])
    # item_id = IntegerField("Item ID",validators=[validators.input_required()])
    # user_id = IntegerField('User ID',validators=[validators.input_required()])
    star_rating = IntegerField('Star Rating',validators=[DataRequired()])
    review_details = StringField('Review Details',validators=[DataRequired()])
    item_id = IntegerField("Item ID",validators=[DataRequired()])
    user_id = IntegerField('User ID',validators=[DataRequired()])
