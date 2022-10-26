
from flask import Blueprint, jsonify, request
from app.models import User, db, Item
from flask_login import login_required, current_user
from app.models.reviews import Review
import re


item_routes = Blueprint('items', __name__)

@item_routes.route('', methods=["GET"])
def get_item():
    """
    Get all items
    """
    # searchTerm ='%'+request.args['q']+'%' if 'q' in request.args.keys() else '%'
    # try:
    #     searchTerms = request.args.to_dict()['q'].split(" ")
    #     returnList = []
    #     for searchTerm in searchTerms:
    #         items = Item.query.filter(Item.title.ilike("%" + searchTerm + "%") | Item.description.ilike("%" + searchTerm + "%")).all()
    #         returnList.extend([i.to_dict() for i in items])
    #     return { 'items' : returnList}
    # except:
    items = Item.query.all()
    return {'items': [i.to_dict() for i in items]}
