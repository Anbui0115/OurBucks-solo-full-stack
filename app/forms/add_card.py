from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms import validators

def valid_credit_number(form, field):
    credit_number = field.data
    if not (len(card_number) == 16):
        raise ValidationError('Credit card number is not 16 digits.')

def valid_expiry_date(form, field):
    expiry_date = field.data
    expiry_month, expiry_year = expiry_date.split('/')
    if int(expiry_month) > 12 or int(expiry_month) < 1:
        raise ValidationError('Credit card expiry date is not valid.')

    if int(expiry_year) < 22 or (int(expiry_year) == 22 and int(expiry_month) < 11):
        raise ValidationError('Credit card has expired.')

def valid_security_number(form, field):
    security_number = field.data
    if len(security_number) < 3 or len(security_number) > 4:
        raise ValidationError('Credit card security number is not valid.')



class AddCard(FlaskForm):
    credit_number = StringField('credit_number', validators=[DataRequired(), valid_card_number])
    expiry_date = StringField('expiry_date', validators=[DataRequired(), valid_expiry_date])
    security_number = StringField('security_number', validators=[DataRequired(), valid_security_number])
