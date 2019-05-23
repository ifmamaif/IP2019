from sqlalchemy import Column, Integer, String
from tfm_services.databases.mysql.context import MySqlContext

ContextBase = MySqlContext().get_base()

class ChaptersLinking(ContextBase):

    __tablename__ = 'chapters_linkings'

    # columns
    start_chapter_id = Column(Integer, primary_key = True)
    end_chapter_id = Column(Integer, primary_key = True)
    
    def __init__(self, start_chapter_id, end_chapter_id):
        self.start_chapter_id = start_chapter_id
        self.end_chapter_id = end_chapter_id