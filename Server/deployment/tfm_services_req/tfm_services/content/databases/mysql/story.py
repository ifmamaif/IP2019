from sqlalchemy import Column, Integer, String
from tfm_services.databases.mysql.context import MySqlContext

ContextBase = MySqlContext().get_base()

class Story(ContextBase):

    __tablename__ = 'stories'

    # columns
    id = Column(Integer, primary_key = True)
    title = Column(String(45))
    cover_path = Column(String(200))
    start_chapter_id = Column(Integer)
    
    def __init__(self, id, title, cover_path, start_chapter_id):
        self.id = id
        self.title = title
        self.cover_path = cover_path
        self.start_chapter_id = start_chapter_id