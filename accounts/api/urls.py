from django.urls import path, include
from django.views.generic import TemplateView
from . views import ListUsers, RegisterUserApi
from rest_framework.authtoken.views import ObtainAuthToken


urlpatterns = [
    path('outh-token', ObtainAuthToken.as_view(), name='get-outh-token'),
    path('register', RegisterUserApi.as_view(), name='register_api'),
    path('users', ListUsers.as_view(), name='users_api'),
]