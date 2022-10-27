from flask.cli import AppGroup
from .users import seed_users, undo_users
from .items import seed_items,undo_items
from .reviews import seed_reviews,undo_reviews
from .orders import seed_orders,undo_orders
from .cards import seed_cards,undo_cards
from .customized_items import seed_customized_items,undo_customized_items
from .order_items import seed_order_items,undo_order_items
from .customizations import seed_customizations,undo_customizations
from .customized_selections import seed_customized_selections,undo_customized_selections
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_items()
    seed_reviews()
    seed_orders()
    seed_cards()
    seed_customized_items()
    seed_order_items()
    seed_customizations()
    seed_customized_selections()


    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_items()
    undo_reviews()
    undo_orders()
    undo_cards()
    undo_customized_items()
    undo_order_items()
    undo_customizations()
    undo_customized_selections()
    # Add other undo functions here
