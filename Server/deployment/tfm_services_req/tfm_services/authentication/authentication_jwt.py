from tfm_services.authentication.authentication_utils import AuthenticationUtils
from datetime import datetime, timedelta

class AuthenticationJWT:

    jwt_key = AuthenticationUtils.encrypt_string('the_fairytale_machine')
    jwt_exp_time = timedelta(minutes = 30)

    def __init__(self, user_name, is_admin):
        self._user_name_ = user_name
        self._is_admin_ = is_admin

    @property
    def is_admin(self):
        return bool(self._is_admin_)

    @property
    def user_name(self):
        return self._user_name_
        
    def encode(self):
        return AuthenticationUtils.encode_jwt(payload = {

            'user_name' : self.user_name,
            'is_admin' : self.is_admin,
            'exp' : datetime.utcnow() + AuthenticationJWT.jwt_exp_time
        
        }, secret_key = AuthenticationJWT.jwt_key)

    @classmethod
    def decode(cls, data):

        payload = AuthenticationUtils.decode_jwt(encoded_jwt = data,
                                                 secret_key = AuthenticationJWT.jwt_key)
        if payload:
            user_name = payload['user_name']
            is_admin = payload['is_admin']
            return cls(user_name, is_admin)