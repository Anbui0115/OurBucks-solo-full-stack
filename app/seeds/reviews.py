from app.models import db,Review



def seed_reviews():
    review1 =Review(user_id = 1, item_id=1, star_rating=5,review_details='good')
    review2 =Review(user_id = 2, item_id=2, star_rating=5,review_details='good')
    review3 =Review(user_id = 3, item_id=3, star_rating=5,review_details='good')
    review4 =Review(user_id = 4, item_id=4, star_rating=5,review_details='good')
    review5 = Review(user_id = 5, item_id=5, star_rating=5,review_details='good')



    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
