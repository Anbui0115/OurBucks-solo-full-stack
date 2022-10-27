from flask_wtf import FlaskForm
from wtforms import IntegerField,StringField
from wtforms import validators



class CreateOrder(FlaskForm):
    user_id = IntegerField('user_id',validators=[validators.input_required()])
    status = StringField('status',validators=[validators.input_required()])
    # quantity = IntegerField('quantity',validators=[validators.input_required()])
