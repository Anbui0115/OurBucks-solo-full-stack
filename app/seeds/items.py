from app.models import db, Item



def seed_items():
    item1 = Item(name = 'Caffe Americanos',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item2 = Item(name = 'Veranda Blend',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item3 = Item(name = 'Caffe Misto',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item4 = Item(name = 'Feature Dark Roast Coffee',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item5 = Item(name = 'Feature Medium Roast - Pike Place Roast',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item6 = Item(name = 'Decaf Pike Place Roast',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item7 = Item(name = 'Cappuccino',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item8 = Item(name = 'Expresso',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item9 = Item(name = 'Expresso Con Panna',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item10 = Item(name = 'Flat White',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item11 = Item(name = 'Honey Almondmilk Flat White',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item12 = Item(name = 'Pumpkin Spice Latte',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item13 = Item(name = 'Caffe Latte',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item14 = Item(name = 'Cinnamon Dolce Latte',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item15 = Item(name = 'Blonde Vanilla Latte',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item16 = Item(name = 'Apple Crisp Oatmilk Macchiato',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item17 = Item(name = 'Caramel Macchiato',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item18 = Item(name = 'Espresso Macchiato',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item19 = Item(name = 'Caffe Mocha',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")
    item20 = Item(name = 'White Chocolate Mocha',calories = 220, price = 5.25 , description='description',drink_category = 'hot coffees',image_url="test")


    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)
    db.session.add(item7)
    db.session.add(item8)
    db.session.add(item9)
    db.session.add(item10)
    db.session.add(item11)
    db.session.add(item12)
    db.session.add(item13)
    db.session.add(item14)
    db.session.add(item15)
    db.session.add(item16)
    db.session.add(item17)
    db.session.add(item18)
    db.session.add(item19)
    db.session.add(item20)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()


# from alembic import op

# op.bulk_insert(Item.__table__,
#     [
#         {
#         'id': 1,
#         'name':'Test 1',
#         'calories': 200,
#         'price': 5.25,
#         'description': 'testest',
#         'drink_category': 'cold balck tea',
#         "image_url":"test"
#         },
#         {
#         'id': 2,
#         'name':'Test 2',
#         'calories': 200,
#         'price': 5.25,
#         'description': 'testest',
#         'drink_category': 'cold balck tea',
#         "image_url":"test"
#         }
#    ])
