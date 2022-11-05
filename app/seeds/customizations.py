from app.models import db, Customization



def seed_customizations():
    customizations = []
    # Milk
    customizations.append(Customization(name ="Soy Milk", category="Milk"))
    customizations.append(Customization(name ="Almond Milk", category="Milk"))
    customizations.append(Customization(name ="Oat Milk", category="Milk"))
    customizations.append(Customization(name ="Heavy Cream", category="Milk"))
    customizations.append(Customization(name ="Vanilla Sweet Cream", category="Milk"))
    customizations.append(Customization(name ="2% Milk", category="Milk"))
    customizations.append(Customization(name ="Whole Milk", category="Milk"))
    customizations.append(Customization(name ="Half & Half", category="Milk"))
    customizations.append(Customization(name ="Coconut Milk", category="Milk"))

    # Flavor
    customizations.append(Customization(name ="Brown Sugar Syrup", category="Flavor"))
    customizations.append(Customization(name ="Apple Brown Sugar", category="Flavor"))
    customizations.append(Customization(name ="Caramel Syrup", category="Flavor"))
    customizations.append(Customization(name ="Cinnamon Dolce Syrup", category="Flavor"))
    customizations.append(Customization(name ="Hazelnut Syrup", category="Flavor"))
    customizations.append(Customization(name ="Peppermint Syrup", category="Flavor"))
    customizations.append(Customization(name ="Raspberry Syrup", category="Flavor"))
    customizations.append(Customization(name ="Toasted Vanilla Syrup", category="Flavor"))
    customizations.append(Customization(name ="Toffee Nut Syrup", category="Flavor"))
    customizations.append(Customization(name ="Vanilla Syrup", category="Flavor"))

    # Ice
    customizations.append(Customization(name ="No Ice", category="Ice"))
    customizations.append(Customization(name ="Light Ice", category="Ice"))
    customizations.append(Customization(name ="Extra Ice", category="Ice"))


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
