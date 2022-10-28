from flask import Blueprint, request
from app.models import User, db, user
from flask_login import login_required, current_user
from app.models import User, db, Order,OrderItem
from app.forms import AddOrderItem



order_item_routes = Blueprint('order_item', __name__)


@order_routes.route('/<order_item_id>', methods=["GET"])
@login_required
def get_order_items(order_item_id):
    """
    Get order item from order item ID
    """
    user_id = current_user.id
    order_item = OrderItem.query.get(order_item_id)

    if not order_item:
        return {'error': 'Order item does not exist.'}, 400
    else:
        return {'order_item': order_item.to_dict()}

@order_routes.route('/order/<order_id>', methods=["GET"])
@login_required
def get_order_items(order_id):
    """
    Get all order items from order ID
    """
    user_id = current_user.id
    order_items = OrderItem.query.filter_by(order_id=order_id).all()

    if not order_items:
        return {'order_items': []}
    else:
        return {'order_items': [i.to_dict() for i in order_items]}

@order_routes.route('/order/<order_id>', methods=["POST"])
@login_required
def add_order_item(order_id):
    """
    Add order item to order
    """
    user_id = current_user.id

    form = AddOrderItem()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data['item_id']:
            order_item = OrderItem.query.filter_by(order_id=order_id, item_id=form.data['item_id']).one()
        else if form.data['customized_item_id']:
            order_item = OrderItem.query.filter_by(order_id=order_id, customized_item_id=form.data['customized_item_id']).one()
        
        if not order_item:
            order_item = OrderItem()
            form.populate_obj(card)
            card.order_id = order_id
            db.session.add(card)
        else:
            order_item.quantity += form.data['quantity']
        db.session.commit()
        return {'order_item': order_item.to_dict()}
    else:
        return {'errors': form.errors}, 400

@order_routes.route('/<order_item_id>', methods=["DELETE"])
@login_required
def delete_order_item(order_item_id):
    """
    Delete order item by ID
    """
    user_id = current_user.id
    order_item = OrderItem.query.get(order_item_id)
    if not order_item:
        return {'errors': 'Order item does not exist.'}, 400
    else: 
        db.session.delete(order_item)
        db.session.commit()
        return {"message": "Deleted successfuly"}

@order_routes.route('/<order_item_id>', methods=["PUT"])
@login_required
def edit_order_item(order_item_id):
    """
    Update order item by ID
    """
    user_id = current_user.id
    form = AddOrderItem()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        order_item = OrderItem.query.get(order_item_id)
        if not order_item:
            return {'errors': 'Order item does not exist.'}, 400
        else:
            if form.data['quantity'] > 0:
                order_item.quantity = form.data['quantity']
                db.session.commit()
                return {'order_item': order_item.to_dict()}
            else:
                db.session.delete(order_item)
                db.session.commit()
                return {"message": "Deleted successfuly"}
    else:
        return {'errors': form.errors}, 400
