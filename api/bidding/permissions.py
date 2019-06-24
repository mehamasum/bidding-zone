from rest_framework import permissions


class IsAuctionableOwner(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit/delete it.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user and obj.user == request.user
