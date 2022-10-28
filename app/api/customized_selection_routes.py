from flask import Blueprint, request
from app.models import User, db, user
from flask_login import login_required, current_user
from app.models import User, db, CustomizedItem, CustomizedSelection, Customization
from app.forms.add_customized_selection import AddCustomizedSelection



customized_selection_routes = Blueprint('customized_selection', __name__)


@customized_selection_routes.route('/<customized_selection_id>', methods=["GET"])
@login_required
def get_customized_selection_by_id(customized_selection_id):
    """
    Get customized selection from ID
    """
    user_id = current_user.id
    customized_selection = CustomizedSelection.query.get(customized_selection_id)

    if not customized_selection:
        return {'error': 'Order item does not exist.'}, 400
    else:
        return {'customized_selection': customized_selection.to_dict()}

@customized_selection_routes.route('/customized_item/<customized_item_id>', methods=["GET"])
@login_required
def get_customized_selections(customized_item_id):
    """
    Get all customized selections from customized item ID
    """
    user_id = current_user.id
    customized_selections = CustomizedSelection.query.filter_by(customized_item_id=customized_item_id).all()

    if not customized_selections:
        return {'customized_selections': []}
    else:
        return {'customized_selections': [i.to_dict() for i in customized_selections]}

@customized_selection_routes.route('/customized_item/<customized_item_id>', methods=["POST"])
@login_required
def add_customized_selection(customized_item_id):
    """
    Add customized selection from customized item
    """
    user_id = current_user.id

    form = AddCustomizedSelection()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        customized_selection = CustomizedSelection.query.filter_by(customized_item_id=customized_item_id, customization_id=form.data['customization_id']).first()

        if not customized_selection:
            customized_selection = CustomizedSelection()
            form.populate_obj(customized_selection)
            customized_selection.customized_item_id = customized_item_id
            db.session.add(customized_selection)
            db.session.commit()
            return {'customized_selection': customized_selection.to_dict()}
        else:
            return {'errors': 'Customized selection already exists.'}, 400
    else:
        return {'errors': form.errors}, 400

@customized_selection_routes.route('/<customized_selection_id>', methods=["DELETE"])
@login_required
def delete_customized_selection(customized_selection_id):
    """
    Delete customized selection by ID
    """
    user_id = current_user.id
    customized_selection = CustomizedSelection.query.get(customized_selection_id)
    if not customized_selection:
        return {'errors': 'Customized selection does not exist.'}, 400
    else:
        db.session.delete(customized_selection)
        db.session.commit()
        return {"message": "Deleted successfuly"}

@customized_selection_routes.route('/<customized_selection_id>', methods=["PUT"])
@login_required
def edit_customized_selection(customized_selection_id):
    """
    Update customized selection by ID
    """
    user_id = current_user.id

    form = AddCustomizedSelection()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        customized_selection = CustomizedSelection.query.get(customized_selection_id)
        if not customized_selection:
            return {'errors': 'Customization selection does not exist.'}, 400
        else:
            form.populate_obj(customized_selection)
            db.session.commit()
            return {'customized_selection': customized_selection.to_dict()}
    else:
        return {'errors': form.errors}, 400
