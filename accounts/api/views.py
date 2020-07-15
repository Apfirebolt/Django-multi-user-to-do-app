from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView
from accounts.models import CustomUser
from . serializers import UserSerializer, AccountSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password


class RegisterUserApi(CreateAPIView):
  model = CustomUser
  permission_classes = []
  serializer_class = AccountSerializer

  def create(self, request, *args, **kwargs):
    try:
      params = request.data
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      self.perform_create(serializer)
      return Response({"message": "You have been successfully registered", "success": True, "data": serializer.data},
                      status=status.HTTP_201_CREATED)

    except Exception as Err:
      print(Err)
      return Response({"message": "Some error occurred in creating user!",
                       "errors": serializer.errors}, status.HTTP_400_BAD_REQUEST)

  def perform_create(self, serializer):
    # Validated data can be modified before save inside perform create method
    given_password = serializer.validated_data['password']
    hashed_password = make_password(given_password)
    serializer.save(password=hashed_password)


class ListUsers(ListAPIView):
  model = CustomUser
  permission_classes = []
  serializer_class = UserSerializer

  def get_queryset(self):
    return CustomUser.objects.all()
