
from flask import Blueprint, jsonify, request
from app.models import User, db, Customization
from flask_login import login_required, current_user
from app.models.reviews import Review



customization_routes = Blueprint('customization', __name__)

@customization_routes.route('', methods=["GET"])
def get_all_customizations():
    """
    Get all customizations
    """
    customizations = Customization.query.all()
    return {'customizations': [i.to_dict() for i in customizations]}


@customization_routes.route('/category/<category>', methods=["GET"])
def get_all_customizations_by_category(category):
    """
    Get all customizations by customization category
    """
    customizations = Customization.query.filter_by(category=category).all()
    return {'customizations': [i.to_dict() for i in customizations]}

@customization_routes.route('/<int:customization_id>', methods=["GET"])
def get_customization_by_id(customization_id):
    """
    Get customization by id
    """
    customization = Customization.query.get(customization_id)
    return {'customization': customization.to_dict()}

