
from flask import Blueprint, jsonify, request
from app.models import User, db, Item
from flask_login import login_required, current_user
from app.models.reviews import Review



item_routes = Blueprint('items', __name__)

@item_routes.route('', methods=["GET"])
def get_item():
    """
    Get all items
    """
    items = Item.query.all()
    return {'items': [i.to_dict() for i in items]}


@item_routes.route('/<int:id>', methods=["GET"])
def get_item_by_id(id):
    """
    Get item by id
    """
    items = Item.query.filter_by(id=id).all()
    return {'items': [i.to_dict() for i in items]}
