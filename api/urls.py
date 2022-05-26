from django.urls import path, include
from api.views import TaskListApiView, ListCustomUsersApiView, CategoryListApiView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('tasks/', TaskListApiView.as_view(), name='task-list'),
    path('category/', CategoryListApiView.as_view(), name='category-list'),
]