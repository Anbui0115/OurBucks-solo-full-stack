from flask import Blueprint, request
from app.models import User, db, user
from flask_login import login_required, current_user
from app.models import User, db, Order,OrderItem
from app.forms.add_order_item import AddOrderItem



order_item_routes = Blueprint('order_item', __name__)


@order_item_routes.route('/<order_item_id>', methods=["GET"])
@login_required
def get_order_items_by_id(order_item_id):
    """
    Get order item from order item ID
    """
    # user_id = current_user.id
    order_item = OrderItem.query.get(order_item_id)


    new_ele = order_item.to_dict()
    if order_item.customized_item_id:
        new_ele["image_url"] = order_item.customized_item.item.image_url
        new_ele["name"] = order_item.customized_item.name
        new_ele["price"] = order_item.customized_item.item.price

    elif order_item.item_id:
        new_ele["image_url"] = order_item.item.image_url
        new_ele["name"] = order_item.item.name
        new_ele["price"] = order_item.item.price

    if not order_item:
        return {'error': 'Order item does not exist.'}, 400
    else:
        return {'order_item': new_ele}

@order_item_routes.route('/order/<order_id>', methods=["GET"])
@login_required
def get_order_items(order_id):
    """
    Get all order items from order ID
    """
    user_id = current_user.id
    order_items = OrderItem.query.filter_by(order_id=order_id).all()
    # frontend used fields: name (of item), image_url, quantity, price,
    # additional fields: item_id, customized_item_id, id
    result = []
    for ele in order_items:
        new_ele = ele.to_dict()
        if ele.customized_item_id:
            new_ele["image_url"] = ele.customized_item.item.image_url
            new_ele["name"] = ele.customized_item.name
            new_ele["price"] = ele.customized_item.item.price

        elif ele.item_id:
            new_ele["image_url"] = ele.item.image_url
            new_ele["name"] = ele.item.name
            new_ele["price"] = ele.item.price

        result.append(new_ele)

    if not order_items:
        return {'order_items': []}
    else:
        return {'order_items': result}

@order_item_routes.route('/order/<order_id>', methods=["POST"])
@login_required
def add_order_item(order_id):
    """
    Add order item to order
    """
    user_id = current_user.id

    form = AddOrderItem()
    print('FORM~~~~~~~~~~~~~~~~~~',form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        order_item = None
        if not form.data['item_id'] and not form.data['customized_item_id']:
            return {'errors': 'Item not specified.'}, 400
        elif form.data['item_id'] and form.data['customized_item_id']:
            return {'errors': 'Both item ID and customized item ID specified. Should only have one.'}, 400

        if form.data['item_id']:
            order_item = OrderItem.query.filter_by(order_id=order_id, item_id=form.data['item_id']).first()
        elif form.data['customized_item_id']:
            order_item = OrderItem.query.filter_by(order_id=order_id, customized_item_id=form.data['customized_item_id']).first()

        if not order_item:
            order_item = OrderItem()
            form.populate_obj(order_item)
            order_item.order_id = order_id
            db.session.add(order_item)
        else:
            order_item.quantity += form.data['quantity']
        db.session.commit()
        return {'order_item': order_item.to_dict()}
    else:
        return {'errors': form.errors}, 400

@order_item_routes.route('/<order_item_id>', methods=["DELETE"])
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

@order_item_routes.route('/<order_item_id>', methods=["PUT"])
@login_required
def edit_order_item(order_item_id):
    """
    Update order item by ID
    """
    user_id = current_user.id
    form = AddOrderItem()
    print('FORM INSIDE ADD ORDER ITEM-----------------------',form)
    form['csrf_token'].data = request.cookies['csrf_token']
    print('\n\n\n\n', form.data, '\n\n\n\n\n')

    if form.validate_on_submit():
        order_item = OrderItem.query.get(order_item_id)
        if not order_item:
            return {'errors': 'Order item does not exist.'}, 400
        else:
            if form.data['quantity'] > 0:
                order_item.quantity = form.data['quantity']
                db.session.commit()

                new_ele = order_item.to_dict()
                if order_item.customized_item_id:
                    new_ele["image_url"] = order_item.customized_item.item.image_url
                    new_ele["name"] = order_item.customized_item.name
                    new_ele["price"] = order_item.customized_item.item.price

                elif order_item.item_id:
                    new_ele["image_url"] = order_item.item.image_url
                    new_ele["name"] = order_item.item.name
                    new_ele["price"] = order_item.item.price
                print("RETURN INSIDE EDIT ORDER ITEM BE ROUTE",new_ele)
                return {'order_item': new_ele}
            else:
                db.session.delete(order_item)
                db.session.commit()
                return {"message": "Deleted successfuly"}
    else:
        return {'errors': form.errors}, 400
