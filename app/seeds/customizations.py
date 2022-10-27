from app.models import db, Customization



def seed_customizations():
    customizations = []
    # Milk
    customizations.append(Customization(name ="Soy Milk", category="milk"))
    customizations.append(Customization(name ="Almond Milk", category="milk"))
    customizations.append(Customization(name ="Oat Milk", category="milk"))
    customizations.append(Customization(name ="Heavy Cream", category="milk"))
    customizations.append(Customization(name ="Vanilla Sweet Cream", category="milk"))
    customizations.append(Customization(name ="2% Milk", category="milk"))
    customizations.append(Customization(name ="Whole Milk", category="milk"))
    customizations.append(Customization(name ="Half & Half", category="milk"))
    customizations.append(Customization(name ="Coconut Milk", category="milk"))

    # Flavor
    customizations.append(Customization(name ="Brown Sugar Syrup", category="flavor"))
    customizations.append(Customization(name ="Apple Brown Sugar", category="flavor"))
    customizations.append(Customization(name ="Caramel Syrup", category="flavor"))
    customizations.append(Customization(name ="Cinnamon Dolce Syrup", category="flavor"))
    customizations.append(Customization(name ="Hazelnut Syrup", category="flavor"))
    customizations.append(Customization(name ="Peppermint Syrup", category="flavor"))
    customizations.append(Customization(name ="Raspberry Syrup", category="flavor"))
    customizations.append(Customization(name ="Toasted Vanilla Syrup", category="flavor"))
    customizations.append(Customization(name ="Toffee Nut Syrup", category="flavor"))
    customizations.append(Customization(name ="Vanilla Syrup", category="flavor"))

    # Ice
    customizations.append(Customization(name ="No Ice", category="ice"))
    customizations.append(Customization(name ="Light Ice", category="ice"))
    customizations.append(Customization(name ="Extra Ice", category="ice"))


    for customization in customizations:
        db.session.add(customization)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_customizations():
    db.session.execute('TRUNCATE customizations RESTART IDENTITY CASCADE;')
    db.session.commit()
