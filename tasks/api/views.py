from rest_framework.generics import ListAPIView, CreateAPIView
from tasks.models import Category, Task
from . serializers import TaskSerializer, CategorySerializer


class ListTasks(ListAPIView):
  model = Task
  permission_classes = []
  queryset = Task.objects.all()
  serializer_class = TaskSerializer


class ListCategory(ListAPIView):
  model = Category
  permission_classes = []
  queryset = Category.objects.all()
  serializer_class = CategorySerializer

