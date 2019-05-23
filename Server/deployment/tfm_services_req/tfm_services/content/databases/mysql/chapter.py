from sqlalchemy import Column, Integer, String
from tfm_services.databases.mysql.context import MySqlContext

ContextBase = MySqlContext().get_base()

class Chapter(ContextBase):

    __tablename__ = 'chapters'

    # columns
    id = Column(Integer, primary_key = True)
    setting = Column(String(5000))
    record_path = Column(String(200))
    cover_path = Column(String(200))
    character_path = Column(String(200))
    story_id = Column(Integer)

    def __init__(self, id, setting, record_path, cover_path, character_path, story_id):
        self.id = id
        self.setting = setting
        self.record_path = record_path
        self.cover_path = cover_path
        self.character_path = character_path
        self.story_id = story_id