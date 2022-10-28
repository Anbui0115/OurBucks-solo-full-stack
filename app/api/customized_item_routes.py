
from flask import Blueprint, jsonify, request
from app.models import User, db, CustomizedItem
from flask_login import login_required, current_user
from app.models.items import Item
from app.models.reviews import Review



customized_item_routes = Blueprint('customized_items', __name__)

@customized_item_routes.route('', methods=["GET"])
def get_customized_item():
    """
    Get all customized items belong to this current user
    """
    user_id = current_user.id
    customized_items = CustomizedItem.query.filter_by(user_id=user_id).all()
    result = [i.to_dict() for i in customized_items]
    print('TEST!!!!!!!!!!!!!!!!!!!!!!!!',result)
    # item_id= Item.query.get()
    # return {'customized_items': [i.to_dict() for i in customized_items]}
    return "test"

@customized_item_routes.route('/<int:customized_items_id>', methods=["GET"])
def get_customized_item_by_id(id):
    """
    Get customized item by id belong to this current user
    """
    items = Item.query.filter_by(id=id).all()
    return {'items': [i.to_dict() for i in items]}
