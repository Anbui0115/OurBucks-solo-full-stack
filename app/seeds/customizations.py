from app.models import db, Customization



def seed_customizations():
    customization1 = Customization(name ="soy milk", category="milk")
    customization2 = Customization(name ="brown sugar", category="syrup")
    customization3 = Customization(name ="almond milk", category="milk")
    customization4 = Customization(name ="oat milk", category="milk")
    customization5 = Customization(name ="less ice", category="ice")



    db.session.add(customization1)
    db.session.add(customization2)
    db.session.add(customization3)
    db.session.add(customization4)
    db.session.add(customization5)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_customizations():
    db.session.execute('TRUNCATE customizations RESTART IDENTITY CASCADE;')
    db.session.commit()
