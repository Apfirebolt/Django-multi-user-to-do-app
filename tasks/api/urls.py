from django.urls import path, include
from django.views.generic import TemplateView
from . views import  ListCategory, ListTasks

urlpatterns = [
  path('', TemplateView.as_view(template_name='tasks/create_category.html'), name='task_home'),
  path('/all_categories', ListCategory.as_view(), name='all_categories'),
  path('/all_tasks', ListTasks.as_view(), name='all_tasks'),

]