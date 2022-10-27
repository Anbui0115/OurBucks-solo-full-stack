from app.models import db, CustomizedSelection



def seed_customized_selections():
    customized_selection1 = CustomizedSelection(customization_id = 1, customized_items_id=1)
    customized_selection2 = CustomizedSelection(customization_id = 2, customized_items_id=2)
    customized_selection3 = CustomizedSelection(customization_id = 3, customized_items_id=3)
    customized_selection4 = CustomizedSelection(customization_id = 4, customized_items_id=4)
    customized_selection5 = CustomizedSelection(customization_id = 5, customized_items_id=5)



    db.session.add(customized_selection1)
    db.session.add(customized_selection2)
    db.session.add(customized_selection3)
    db.session.add(customized_selection4)
    db.session.add(customized_selection5)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_customized_selections():
    db.session.execute('TRUNCATE customized_selections RESTART IDENTITY CASCADE;')
    db.session.commit()
