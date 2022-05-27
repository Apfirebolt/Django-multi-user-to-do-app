from django.urls import path, include
from api.views import TaskCreateListApiView, ListCustomUsersApiView, CategoryListApiView, CreateCustomUserApiView \
    , CategoryUpdateDeleteDetailApiView, TaskUpdateDeleteDetailApiView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


urlpatterns = [
    path('register', CreateCustomUserApiView.as_view(), name='api-register'),
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('users', ListCustomUsersApiView.as_view(), name='user-list'),
    path('tasks', TaskCreateListApiView.as_view(), name='task-list'),
    path('category', CategoryListApiView.as_view(), name='category-list'),
    path('category/<int:pk>', CategoryUpdateDeleteDetailApiView.as_view(), name='category-detail'),
    path('task/<int:pk>', TaskUpdateDeleteDetailApiView.as_view(), name='task-detail'),
]