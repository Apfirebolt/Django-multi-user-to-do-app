from rest_framework import permissions
from tasks.models import Category, Task


class IsCategoryOwner(permissions.BasePermission):

    # for object level permissions
    def has_object_permission(self, request, view, category_obj):
        return category_obj.created_by.id == request.user.id

