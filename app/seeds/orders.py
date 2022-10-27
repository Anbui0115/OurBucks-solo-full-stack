from app.models import db, Order



def seed_orders():
    orders = []
    NUM_OF_USERS = 5

    for i in range(40):
        orders.append(Order(user_id = (i % NUM_OF_USERS) + 1, status = "completed"))

    for i in range(5):
        orders.append(Order(user_id = (i % NUM_OF_USERS) + 1, status = "not placed"))

    for order in orders:
        db.session.add(order)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_orders():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
