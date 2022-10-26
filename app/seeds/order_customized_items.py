from app.models import db,OrderCustomizedItem



def seed_order_customized_items():
    orderItem1 = OrderCustomizedItem(order_id = 1,customized_item_id=1 ,)
    orderItem2 = OrderCustomizedItem(order_id = 2,customized_item_id=2 ,)
    orderItem3 = OrderCustomizedItem(order_id = 3,customized_item_id=3 ,)
    orderItem4 = OrderCustomizedItem(order_id = 4,customized_item_id=4 ,)
    orderItem5 = OrderCustomizedItem(order_id = 5,customized_item_id=5 ,)
    orderItem6 = OrderCustomizedItem(order_id = 1,customized_item_id=1 ,)
    orderItem7 = OrderCustomizedItem(order_id = 2,customized_item_id=2 ,)
    orderItem8 = OrderCustomizedItem(order_id = 3,customized_item_id=3 ,)
    orderItem9 = OrderCustomizedItem(order_id = 4,customized_item_id=4 ,)
    orderItem10 = OrderCustomizedItem(order_id = 5,customized_item_id=5 ,)


    db.session.add(orderItem1)
    db.session.add(orderItem2)
    db.session.add(orderItem3)
    db.session.add(orderItem4)
    db.session.add(orderItem5)
    db.session.add(orderItem6)
    db.session.add(orderItem7)
    db.session.add(orderItem8)
    db.session.add(orderItem9)
    db.session.add(orderItem10)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_order_customized_items():
    db.session.execute('TRUNCATE order_customized_items RESTART IDENTITY CASCADE;')
    db.session.commit()
