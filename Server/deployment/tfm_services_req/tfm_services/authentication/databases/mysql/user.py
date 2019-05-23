from sqlalchemy import Column, Integer, String, Boolean
from tfm_services.databases.mysql.context import MySqlContext

ContextBase = MySqlContext().get_base()

class User(ContextBase):

    __tablename__ = 'users'

    # columns
    id = Column(Integer, primary_key = True)
    user_name =  Column(String(45))
    password = Column(String(150))
    is_admin = Column(Boolean)
    
    def __init__(self, user_name, password):
        self.id = 0
        self.user_name = user_name
        self.password = password
        self.is_admin = False