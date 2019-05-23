import functools

from tfm_services.authentication.authentication_jwt import AuthenticationJWT
from tfm_services.service_response import (ServiceResponse, ServiceStatus,
                                           ServiceType, build_view_response)

def authorize_operation(service_operation):

    @functools.wraps(service_operation)
    def wrapper_decorator(service):
        
        service_response = ServiceResponse(
            service_type = ServiceType["TFM_" + service_operation.__name__.upper()]
        )

        request = service._request_
        encoded_jwt = request.headers.get('TFMAuthentication')
        
        authentication_jwt = AuthenticationJWT.decode(encoded_jwt)

        if authentication_jwt:
            return service_operation(service, authentication_jwt)
        else:
            service_response.service_status = ServiceStatus.UNAUTHORIZED
            return build_view_response(service_response)

    return wrapper_decorator