from flask_wtf import FlaskForm
from wtforms import IntegerField,StringField
from wtforms import validators


class AddOrderItem(FlaskForm):
    item_id = IntegerField('item_id')
    customized_item_id = IntegerField('customized_item_id')
    quantity = IntegerField('quantity',validators=[validators.input_required()])
