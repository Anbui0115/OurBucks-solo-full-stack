from app.models import db,Card



def seed_cards():
    card1 = Card(user_id = 1, credit_number='1234567890123456',expiry_date='03/23',security_number='123')
    card2 = Card(user_id = 2, credit_number='1234567890123457',expiry_date='03/23',security_number='123')
    card3 = Card(user_id = 3, credit_number='1234567890123458',expiry_date='03/23',security_number='123')
    card4 = Card(user_id = 4, credit_number='1234567890123459',expiry_date='03/23',security_number='123')
    card5 = Card(user_id = 5, credit_number='1234567890123450',expiry_date='03/23',security_number='123')



    db.session.add(card1)
    db.session.add(card2)
    db.session.add(card3)
    db.session.add(card4)
    db.session.add(card5)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
