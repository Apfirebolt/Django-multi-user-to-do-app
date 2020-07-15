from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView
from accounts.models import CustomUser
from . serializers import UserSerializer, AccountSerializer


class RegisterUserApi(CreateAPIView):
  model = CustomUser
  permission_classes = []
  serializer_class = AccountSerializer

  def perform_create(self, serializer):
    pass

  def create(self, request, *args, **kwargs):
    pass


class ListUsers(ListAPIView):
  model = CustomUser
  permission_classes = []
  serializer_class = UserSerializer

  def get_queryset(self):
    return CustomUser.objects.all()
