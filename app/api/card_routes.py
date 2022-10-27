
from flask import Blueprint, jsonify, request
from app.models import User, db, Item
from flask_login import login_required, current_user
from app.models.cards import Card
from app.forms.add_card import AddCard


card_routes = Blueprint('cards', __name__)

@card_routes.route('', methods=["GET"])
@login_required
def get_cards():
    """
    Get all cards of current user
    """
    user_id = current_user.id
    cards = Card.query.filter_by(user_id=user_id).all()
    return {'cards': [i.to_dict() for i in cards]}

@card_routes.route('', methods=["POST"])
@login_required
def add_card():
    """
    Add a card for current user
    """
    user_id = current_user.id
    form = AddCard()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        card = Card()
        form.populate_obj(card)
        card.user_id = user_id
        db.session.add(card)
        db.session.commit()
        return {'card': card.to_dict()}
    else:
        return {'errors': form.errors}, 400

@card_routes.route('/<card_id>', methods=["PUT"])
@login_required
def update_card(card_id):
    """
    Update a card for current user w/ card_id
    """
    user_id = current_user.id
    form = AddCard()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        card = Card.query.get(card_id)
        if not card:
            card = Card()
            card.user_id = user_id
            db.session.add(card)
        form.populate_obj(card)
        db.session.commit()
        return {'card': card.to_dict()}
    else:
        return {'errors': form.errors}, 400

@card_routes.route('/<card_id>', methods=["DELETE"])
@login_required
def delete_card(card_id):
    """
    Delete a card for current user w/ card_id
    """
    user_id = current_user.id
    card = Card.query.get(card_id)
    if card:
        db.session.delete(card)
        db.session.commit()
        return {'card': card.to_dict()}, 201
    else:
        return {'errors': form.errors}, 400
