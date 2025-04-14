"""empty message

Revision ID: 5e6b74ced036
Revises: 
Create Date: 2025-04-13 13:29:50.446032

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5e6b74ced036'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('category_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('category_name', sa.String(), nullable=False),
    sa.Column('category_description', sa.String(), nullable=False),
    sa.CheckConstraint("category_name IN ('womensclothes', 'womensaccessories', 'kidsclothes', 'kidsshoes')", name='category_name'),
    sa.PrimaryKeyConstraint('category_id'),
    sa.UniqueConstraint('category_id')
    )
    op.create_table('users',
    sa.Column('user_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_name', sa.String(), nullable=False),
    sa.Column('password_hash', sa.String(), nullable=False),
    sa.Column('join_date', sa.Date(), nullable=False),
    sa.Column('membership', sa.String(), nullable=False),
    sa.Column('contact_number', sa.Integer(), nullable=True),
    sa.Column('email_id', sa.String(), nullable=False),
    sa.Column('user_type', sa.String(), nullable=False),
    sa.CheckConstraint("membership IN ('regular', 'premium')", name='member_types'),
    sa.CheckConstraint("user_type IN ('customer', 'employee', 'admin')", name='user_types'),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('email_id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('kidsproducts',
    sa.Column('product_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('product_name', sa.String(), nullable=False),
    sa.Column('product_description', sa.String(), nullable=False),
    sa.Column('product_price', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('availability', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.category_id'], ),
    sa.PrimaryKeyConstraint('product_id'),
    sa.UniqueConstraint('product_id')
    )
    op.create_table('orders',
    sa.Column('order_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('payment_status', sa.String(), nullable=False),
    sa.CheckConstraint("payment_status IN ('pending', 'paid', 'cancelled')", name='payment_status'),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('order_id'),
    sa.UniqueConstraint('order_id')
    )
    op.create_table('womensproducts',
    sa.Column('product_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('product_name', sa.String(), nullable=False),
    sa.Column('product_description', sa.String(), nullable=False),
    sa.Column('product_price', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('availability', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.category_id'], ),
    sa.PrimaryKeyConstraint('product_id'),
    sa.UniqueConstraint('product_id')
    )
    op.create_table('shipments',
    sa.Column('shipment_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.Column('shipment_status', sa.String(), nullable=True),
    sa.Column('shipped_from_warehouse_date', sa.Date(), nullable=True),
    sa.Column('reached_destination_date', sa.Date(), nullable=True),
    sa.Column('out_for_delivery_date', sa.Date(), nullable=True),
    sa.Column('delivered_date', sa.Date(), nullable=True),
    sa.CheckConstraint("shipment_status IN ('not_initiated', 'shipped_from_warehouse', 'reached_destination', 'out_for_delivery', 'delivered')", name='payment_status'),
    sa.ForeignKeyConstraint(['order_id'], ['orders.order_id'], ),
    sa.PrimaryKeyConstraint('shipment_id'),
    sa.UniqueConstraint('shipment_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shipments')
    op.drop_table('womensproducts')
    op.drop_table('orders')
    op.drop_table('kidsproducts')
    op.drop_table('users')
    op.drop_table('categories')
    # ### end Alembic commands ###
