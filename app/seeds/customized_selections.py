from app.models import db, CustomizedSelection
import random


def seed_customized_selections():
    customized_selections = []
    NUM_OF_CUSTOMIZATIONS = 22
    NUM_OF_CUSTOMIZATED_ITEMS = 15

    for i in range(NUM_OF_CUSTOMIZATED_ITEMS):
        customized_selections.append(CustomizedSelection(customization_id = i + 1, customized_item_id=random.randrange(1,NUM_OF_CUSTOMIZATIONS)))

    for customized_selection in customized_selections:
        db.session.add(customized_selection)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_customized_selections():
    db.session.execute('TRUNCATE customized_selections RESTART IDENTITY CASCADE;')
    db.session.commit()
