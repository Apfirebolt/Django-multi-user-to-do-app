from rest_framework.generics import ListAPIView, CreateAPIView
from tasks.models import Category, Task
from . serializers import TaskSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticated


class ListTasks(ListAPIView):
  model = Task
  permission_classes = [IsAuthenticated]
  queryset = Task.objects.all()
  serializer_class = TaskSerializer


class ListCategory(ListAPIView):
  model = Category
  permission_classes = [IsAuthenticated]
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
