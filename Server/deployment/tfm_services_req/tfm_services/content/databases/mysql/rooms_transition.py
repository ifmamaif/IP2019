from sqlalchemy import Column, Integer, String
from tfm_services.databases.mysql.context import MySqlContext

ContextBase = MySqlContext().get_base()

class RoomsTransition(ContextBase):

    __tablename__ = 'rooms_transitions'

    # columns
    id = Column(Integer, primary_key = True)
    start_room_id = Column(Integer)
    end_room_id = Column(Integer)
    label = Column(Integer)
    
    def __init__(self, start_room_id, end_room_id, label):
        self.id = 0
        self.start_room_id = start_room_id
        self.end_room_id = end_room_id
        self.label = label