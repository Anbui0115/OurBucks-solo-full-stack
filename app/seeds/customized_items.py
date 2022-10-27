from app.models import db, CustomizedItem



def seed_customized_items():
    customized_item1 = CustomizedItem(user_id = 1, item_id=1)
    customized_item2 = CustomizedItem(user_id = 2, item_id=2)
    customized_item3 = CustomizedItem(user_id = 3, item_id=3)
    customized_item4 = CustomizedItem(user_id = 4, item_id=4)
    customized_item5 = CustomizedItem(user_id = 5, item_id=5)



    db.session.add(customized_item1)
    db.session.add(customized_item2)
    db.session.add(customized_item3)
    db.session.add(customized_item4)
    db.session.add(customized_item5)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_customized_items():
    db.session.execute('TRUNCATE customized_items RESTART IDENTITY CASCADE;')
    db.session.commit()
