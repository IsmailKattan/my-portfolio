"""add_content_language

Revision ID: 747a7d5acd7a
Revises: 
Create Date: 2026-02-24 13:32:13.722104

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '747a7d5acd7a'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('projects',
        sa.Column('content_language', sa.String(10), nullable=False, server_default='en'))
    op.add_column('blog_posts',
        sa.Column('content_language', sa.String(10), nullable=False, server_default='en'))
    op.add_column('experiences',
        sa.Column('content_language', sa.String(10), nullable=False, server_default='en'))
    op.add_column('certificates',
        sa.Column('content_language', sa.String(10), nullable=False, server_default='en'))


def downgrade() -> None:
    with op.batch_alter_table('projects') as batch_op:
        batch_op.drop_column('content_language')
    with op.batch_alter_table('blog_posts') as batch_op:
        batch_op.drop_column('content_language')
    with op.batch_alter_table('experiences') as batch_op:
        batch_op.drop_column('content_language')
    with op.batch_alter_table('certificates') as batch_op:
        batch_op.drop_column('content_language')
