from app.models import db,Review
import random



def seed_reviews():
    sample_details = [
        'I like the taste of this one',
        'Wow! I can\'t believe how good this drink is!',
        'A must try!',
        'I don\'t usually like this type of drink!',
        'Loving it.',
        'The taste is unique.',
        'Something new for me',
        'Meh, not the best, not the worst.',
        'Super interesting!',
        'Good for the summer heat',
        'A bit on the expensive side',
        'Very sweet, but not overwhelming',
        'Smooth!!',
        'Caffeine in the morning makes everything better.',
        'I order this every mornign for the past 3 years!'
    ]
    reviews = []
    NUM_OF_USERS = 5
    NUM_OF_ITEMS = 60

    for i in range(200):
        reviews.append(Review(user_id = (i % NUM_OF_USERS) + 1, item_id= (i % NUM_OF_ITEMS) + 1, star_rating=random.randrange(1,6),review_details=sample_details[random.randrange(0,len(sample_details))]))

    for review in reviews:
        db.session.add(review)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
