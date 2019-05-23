from sqlalchemy import Column, Integer, String
from tfm_services.databases.mysql.context import MySqlContext

ContextBase = MySqlContext().get_base()

class RoomBias(ContextBase):

    __tablename__ = 'rooms_biases'

    # columns
    room_id = Column(Integer, primary_key = True)
    bias = Column(String(45))
    
    def __init__(self, room_id, bias):
        self.room_id = room_id
        self.bias = bias