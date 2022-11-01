from unicodedata import category
from flask_wtf import FlaskForm
from wtforms import IntegerField,StringField
from wtforms import validators


class CreateCustomizedItem(FlaskForm):
    name = StringField('name',validators=[validators.input_required()])
    category= StringField('category',validators=[validators.input_required()])
