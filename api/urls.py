from django.urls import path
from api.views import ListCustomUsersApiView, CreateCustomUserApiView, CustomTokenObtainPairView
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
]