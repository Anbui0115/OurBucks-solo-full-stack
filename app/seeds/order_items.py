from app.models import db,OrderItem
import random


def seed_order_items():
    order_items = []
    NUM_OF_ORDERS = 45
    NUM_OF_CUSTOMIZED_ITEMS = 15
    NUM_OF_ITEMS = 60

    for i in range(100):
        order_items.append(OrderItem(order_id = (i % NUM_OF_ORDERS) + 1, item_id=random.randrange(1,NUM_OF_ITEMS),quantity=random.randrange(1,4)))

    # This won't work since both order and customized items belong to an user. We need to make sure that the customized item and the order belong to the same user, otherwise this will create issues.
    # for i in range(10):
    #    order_items.append(OrderItem(order_id = (i % NUM_OF_ORDERS) + 1, customized_item_id=random.randrange(1,NUM_OF_CUSTOMIZED_ITEMS),quantity=random.randrange(1,4)))


    for order_item in order_items:
        db.session.add(order_item)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_order_items():
    db.session.execute('TRUNCATE order_customized_items RESTART IDENTITY CASCADE;')
    db.session.commit()
