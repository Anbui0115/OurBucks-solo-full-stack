from app.models import db, Order



def seed_orders():
    order1 = Order(user_id = 1, status = "not placed")
    order2 = Order(user_id = 2, status = "not placed")
    order3 = Order(user_id = 3, status = "not placed")
    order4 = Order(user_id = 4, status = "not placed")
    order5 = Order(user_id = 5, status = "not placed")
    order6 = Order(user_id = 1, status = "not placed")
    order7 = Order(user_id = 2, status = "not placed")
    order8 = Order(user_id = 3, status = "not placed")
    order9 = Order(user_id = 4, status = "not placed")
    order10 = Order(user_id = 5, status = "not placed")


    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.add(order4)
    db.session.add(order5)
    db.session.add(order6)
    db.session.add(order7)
    db.session.add(order8)
    db.session.add(order9)
    db.session.add(order10)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_orders():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
