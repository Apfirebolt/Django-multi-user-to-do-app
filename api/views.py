from rest_framework.generics import ListAPIView, CreateAPIView,  UpdateAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from . serializers import CustomUserSerializer, CategorySerializer, TaskSerializer 
from tasks.models import Category, Task
from accounts.models import CustomUser


class CreateCustomUserApiView(CreateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class ChangeSettingsApiView(UpdateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=self.request.user.id)
        return obj


class ListCustomUsersApiView(ListAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class CategoryListApiView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class TaskListApiView(ListAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()




