from django import forms
from . models import Task, Category


class CreateTaskForm(forms.ModelForm):

  class Meta:
    model = Task
    fields = ['name', 'description', 'deadline_date', 'priority', 'category']


class CreateCategoryForm(forms.ModelForm):

  class Meta:
    model = Category
    fields = ['name', 'description', 'category_image']