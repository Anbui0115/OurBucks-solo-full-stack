from app.models import db, CustomizedItem
import random



def seed_customized_items():
    customized_items = []
    NUM_OF_USERS = 5
    NUM_OF_ITEMS = 60


    for i in range(15):
        customized_items.append(CustomizedItem(user_id = (i % NUM_OF_USERS) + 1, item_id=random.randrange(1,NUM_OF_ITEMS)))

    for customized_item in customized_items:
        db.session.add(customized_item)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_customized_items():
    db.session.execute('TRUNCATE customized_items RESTART IDENTITY CASCADE;')
    db.session.commit()
