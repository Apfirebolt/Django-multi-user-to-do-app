from rest_framework.generics import ListAPIView, CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from . serializers import CustomUserSerializer, ListCustomUserSerializer, CategorySerializer, TaskSerializer \
    , CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from api.permissions import IsCategoryOwner 
from tasks.models import Category, Task
from accounts.models import CustomUser

class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer


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
    serializer_class = ListCustomUserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]


class CategoryListApiView(ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by_id=request.user.id)

    def list(self, request):
        queryset = Category.objects.filter(created_by=request.user)
        serializer = CategorySerializer(queryset, many=True, context={'request' : request})
        return Response(serializer.data)

class CategoryUpdateDeleteDetailApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated, IsCategoryOwner]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        object_id = instance.id
        self.perform_destroy(instance)
        return Response({
            "message":"Category deleted successfully",
            "category_id": object_id
        },
        status=status.HTTP_200_OK)



class TaskCreateListApiView(ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by_id=request.user.id)

    def list(self, request):
        queryset = Task.objects.filter(created_by=request.user)
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)


class TaskUpdateDeleteDetailApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated, IsCategoryOwner]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        object_id = instance.id
        self.perform_destroy(instance)
        return Response({
            "message":"Task deleted successfully",
            "task_id": object_id
        },
        status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete()

