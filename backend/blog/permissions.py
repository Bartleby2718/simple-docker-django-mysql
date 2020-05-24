from rest_framework import permissions


class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated:
            return False

        if view.action == 'retrieve':
            return True
        elif view.action in ['update', 'partial_update', 'destroy']:
            return obj == request.user or request.user.is_staff
        else:
            return False
