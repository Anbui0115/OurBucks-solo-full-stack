from flask import Blueprint, request
# from app.forms.update_cart_form import UpdateCart
from app.models import User, db, user
from flask_login import login_required, current_user
from app.models import User, db, Order,OrderItem
# from app.models.purchases import Purchase
from ..forms.create_order import CreateOrder



order_routes = Blueprint('order', __name__)


@order_routes.route('', methods=["GET"])
# @login_required
def get_orders():
    """
    Get all items in the order owned by this user
    """
    # print(current_user)
    # print(current_user.get_id())
    user_id = current_user.id
    order = Order.query.filter_by(user_id=user_id).all()
    # print(list(order),'--------------------------------')
    return {'order': [i.to_dict() for i in order]}

@order_routes.route('', methods=["POST"])
@login_required
def add_to_order():
    """
    Add to order
    """
    user_id = current_user.id
    form = CreateOrder()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        order = Order()
        form.populate_obj(order)
        order.user_id = user_id
        orderByUser = Order.query.filter_by(user_id=user_id).first()
        orderByUserDict = orderByUser.to_dict()
        orderId = orderByUserDict['id']
        # print('ORDER ID ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',orderByUserDict,orderId)
        orderItem = OrderItem.query.filter_by(order_id =orderId).all()
        orderItemList = [item.to_dict() for item in orderItem]
        print('ORDER ITEM ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',orderItemList)
        # [{'id': 1, 'itemId': 1, 'orderId': 1, 'quantity': 1, 'customized_item_id': 1}, {'id': 6, 'itemId': 1, 'orderId': 1, 'quantity': 1, 'customized_item_id': 1}]

        # if orderItem is not None:
        #     orderItem.quantity = orderItem.quantity + order.quantity
        #     db.session.commit()
        #     return {'order': orderItem.to_dict()}
        # else:
        db.session.add(orderByUser)
        db.session.commit()
        return {'order': orderByUser.to_dict()}
    else:
        return {'errors': form.errors}, 400

# @order_routes.route('/<int:id>', methods=["PUT"])
# @login_required
# def edit_order(id):
#     """
#     Edit items in order
#     """
#     form = UpdateOrder()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         cartItem = Shopping_cart.query.filter_by(id=id).first()
#         if cartItem is None:
#             return {'error': "This item is not in cart"}, 404
#         else:
#             form.populate_obj(cartItem)
#             db.session.commit()
#             return cartItem.to_dict()

# @order_routes.route('/checkout', methods=["POST"])
# @login_required
# def checkout_cart():
#     """
#     Empty shopping cart and send items to purchase
#     """
#     user_id = current_user.id
#     cartItems = Shopping_cart.query.filter_by(user_id=user_id).all()

#     for cartItem in cartItems:

#         purchase = Purchase()
#         purchase.user_id = user_id
#         purchase.item_id = cartItem.item_id
#         purchase.quantity = cartItem.quantity
#         purchase.price = cartItem.item.price
#         db.session.add(purchase)
#         db.session.delete(cartItem)

#     db.session.commit()
#     return {"message":"successfuly added to purchase table"}

@order_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_shopping_cart(id):
    """
    Delete item in shopping cart by id
    """
    order = Order.query.filter_by(id=id).first()
    if order is not None:
        db.session.delete(order)
        db.session.commit()
        return {"message": "Deleted successfuly"}
    else:
        return {'errors':["Order couldn't be found"]}, 400
