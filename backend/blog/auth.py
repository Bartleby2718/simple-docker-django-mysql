from rest_framework.authtoken.models import Token

from .models import User


class MyBackend:
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def authenticate(self, request, email=None, password=None):
        key = None
        if 'HTTP_AUTHORIZATION' in request.META:
            auth_header = request.META['HTTP_AUTHORIZATION']
            if auth_header.startswith('Token '):
                key = auth_header.split('Token ')[1]
        try:
            return Token.objects.get(key=key).user
        except Token.DoesNotExist:
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return None
            else:
                return user if user.check_password(password) else None
