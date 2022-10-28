from flask_wtf import FlaskForm
from wtforms import IntegerField,StringField
from wtforms import validators


class CreateCustomizedItem(FlaskForm):
    item_id = IntegerField('item_id',validators=[validators.input_required()])
    name = StringField('name',validators=[validators.input_required()])
