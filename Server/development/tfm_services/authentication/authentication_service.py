from pyramid.view import view_config, view_defaults

from tfm_services.service_response import (ServiceResponse, ServiceStatus,
                                           ServiceType, build_view_response)

from tfm_services.authentication.authentication_dal import AuthenticationDAL
from tfm_services.authentication.authentication_utils import AuthenticationUtils
from tfm_services.authentication.authentication_jwt import AuthenticationJWT
from tfm_services.authentication.authentication_data import UserInfo
from json import JSONDecodeError

@view_defaults(request_method = 'POST')
class AuthenticationService:

    def __init__(self, request):

        self._request_ = request
        self._dal_ = AuthenticationDAL()

    def _get_request_parameter_(self, key):

        parameter = None
        
        try:
            parameter = self._request_.json_body.get(key)
        except JSONDecodeError:
            parameter = None
        return parameter

    @view_config(route_name = 'tfm_register')
    def register(self):

        service_response = ServiceResponse(service_type = ServiceType.TFM_REGISTER)
        user_name = self._get_request_parameter_('user_name')
        password = self._get_request_parameter_('password')

        if user_name and password:

            # ---------------------------
            # TODO: add password salting
            # ---------------------------

            encrypted_password = AuthenticationUtils.encrypt_string(password)
            user_info = UserInfo(

                user_name = user_name,
                password = encrypted_password,
                is_admin = False
            )
            
            result = self._dal_.add_user(user_info)
            
            service_response.service_status = ServiceStatus.CREATED if result \
                else ServiceStatus.CONFLICT

        return build_view_response(service_response)

    @view_config(route_name = 'tfm_login')
    def login(self):
        
        # ---------------------------------
        # TODO: protect against MITM attack
        # ---------------------------------
        service_response = ServiceResponse(service_type = ServiceType.TFM_LOGIN)
        user_name = self._get_request_parameter_('user_name')
        password = self._get_request_parameter_('password')

        if user_name and password:
            
            user_info = self._dal_.get_user(user_name)

            if user_info and AuthenticationUtils.check_encrypted_string(password, user_info.password):

                authenticationJWT = AuthenticationJWT(user_name = user_info.user_name,
                                                      is_admin = user_info.is_admin)

                service_response.service_status = ServiceStatus.OK
                service_response.add_data('user_name', user_info.user_name)
                service_response.add_data('token', authenticationJWT.encode())
                
            else:
                service_response.service_status = ServiceStatus.UNAUTHORIZED

        return build_view_response(service_response)