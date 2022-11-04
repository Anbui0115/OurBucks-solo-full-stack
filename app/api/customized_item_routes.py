
from flask import Blueprint, jsonify, request
from app.models import User, db, CustomizedItem
from flask_login import login_required, current_user
from app.models.items import Item
from app.models.reviews import Review
from app.forms.create_customized_item import CreateCustomizedItem



customized_item_routes = Blueprint('customized_items', __name__)

def augment_result(customized_item):
    augmented_customized_item = customized_item.to_dict()

    augmented_customized_item["image_url"] = customized_item.item.image_url
    augmented_customized_item["name"] = customized_item.name
    augmented_customized_item["price"] = customized_item.item.price
    augmented_customized_item["calories"] = customized_item.item.calories

    return augmented_customized_item

@customized_item_routes.route('', methods=["GET"])
@login_required
def get_customized_items():
    """
    Get all customized items belong to this current user
    """
    user_id = current_user.id
    customized_items = CustomizedItem.query.filter_by(user_id=user_id).all()

    return {'customized_items': [augment_result(customized_item) for customized_item in customized_items]}


@customized_item_routes.route('/<int:customized_item_id>', methods=["GET"])
@login_required
def get_customized_item_by_id(customized_item_id):
    """
    Get customized item by id belong to this current user
    """
    user_id = current_user.id
    customized_item = CustomizedItem.query.filter_by(id=customized_item_id).first()
    if customized_item:
        if customized_item['user_id'] != user_id:
            return {'error': 'Customized item does not belong to current user.'}, 400

        return {'customized_item': augment_result(customized_item)}
    else:
        return {'error': 'Customized item does not exist.'}, 400


@customized_item_routes.route('', methods=["POST"])
@login_required
def create_customized_item():
    """
    Create a customized item
    """
    user_id = current_user.id

    form = CreateCustomizedItem()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        existing_customized_item = CustomizedItem.query.filter_by(name=form.data['name'], user_id=user_id).first()
        if existing_customized_item:
            return {'errors': 'Customized item with the same name already exists.'}, 400
        customized_item = CustomizedItem()
        form.populate_obj(customized_item)
        customized_item.user_id = user_id
        db.session.add(customized_item)
        db.session.commit()
        return {'customized_item': augment_result(customized_item)}
    else:
        return {'errors': form.errors}, 400

@customized_item_routes.route('/<int:customized_item_id>', methods=["PUT"])
@login_required
def edit_customized_item(customized_item_id):
    """
    Edit customized item by id belong to this current user
    """
    user_id = current_user.id

    form = CreateCustomizedItem()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        existing_customized_item = CustomizedItem.query.filter_by(name=form.data['name'], user_id=user_id).first()
        if existing_customized_item and existing_customized_item.id != customized_item_id:
            return {'errors': 'Customized item with the same name already exists.'}, 400

        customized_item = CustomizedItem.query.get(customized_item_id)
        if customized_item:
            form.populate_obj(customized_item)
            db.session.commit()
            return {'customized_item': augment_result(customized_item)}
        else:
            return {'errors': 'Customized item does not exist.'}, 400
    else:
        return {'errors': form.errors}, 400

@customized_item_routes.route('/<int:customized_item_id>', methods=["DELETE"])
@login_required
def delete_customized_item(customized_item_id):
    """
    Get customized item by id belong to this current user
    """
    user_id = current_user.id

    customized_item = CustomizedItem.query.get(customized_item_id)
    if customized_item:
        db.session.delete(customized_item)
        db.session.commit()
        return {"message": "Deleted successfuly"}
    else:
        return {'errors': 'Customized item does not exist.'}, 400
