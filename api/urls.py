from django.urls import path
from api.views import ListCustomUsersApiView, CreateCustomUserApiView, CustomTokenObtainPairView, ChangeSettingsApiView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('register', CreateCustomUserApiView.as_view(), name='api-register'),
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'), # Fixed to match httpClient.js
    path('token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('users', ListCustomUsersApiView.as_view(), name='user-list'),
    path('settings/update', ChangeSettingsApiView.as_view(), name='settings-update'),
]