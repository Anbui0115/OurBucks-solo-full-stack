from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField
from wtforms.validators import DataRequired, ValidationError


class AddReview(FlaskForm):
    star_rating = IntegerField('Star Rating', validators=[DataRequired()])
    review_details = StringField('Review Details', validators=[DataRequired()])
    # item_id = IntegerField("Item ID", validators=[DataRequired()])
