from flask_wtf import FlaskForm
from wtforms import IntegerField,StringField
from wtforms import validators


class AddCustomizedSelection(FlaskForm):
    customization_id = IntegerField('customization_id',validators=[validators.input_required()])
