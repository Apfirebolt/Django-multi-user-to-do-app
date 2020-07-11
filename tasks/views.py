from django.shortcuts import render
from django.views.generic import FormView, DetailView, DeleteView, UpdateView, ListView
from . models import Task, Category
from . forms import CreateCategoryForm, CreateTaskForm
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin
# CRUD functionality for tasks


class CreateTask(LoginRequiredMixin, FormView):
  form_class = CreateTaskForm
  template_name = 'tasks/create_task.html'

  def form_valid(self, form):
    # perform a action here
    print(form.cleaned_data)
    form.save()
    return HttpResponseRedirect(reverse('accounts:dashboard'))


class UpdateTask(UpdateView):
  model = Task
  fields = ['name', 'description', 'category', 'priority', 'deadline_date']


class DeleteTask(DeleteView):
  pass


class ListTask(ListView):
  model = Task
  template_name = 'tasks/list_task.html'
  context_object_name = 'all_tasks'


class DetailTask(DetailView):
  pass


class CreateCategory(LoginRequiredMixin, FormView):
  form_class = CreateCategoryForm
  template_name = 'tasks/create_category.html'

  def form_valid(self, form):
    # perform a action here,
    category_obj = form.save(commit=False)
    category_obj.created_by = self.request.user
    category_obj.save()
    return HttpResponseRedirect(reverse('accounts:dashboard'))


class UpdateCategory(UpdateView):
  model = Category
  fields = ['name', 'description', 'category_image']
  context_object_name = 'category'
  template_name = 'tasks/update_category.html'

  def get_success_url(self):
    return reverse_lazy('accounts:list_category')


class DeleteCategory(DeleteView):
  model = Category
  success_url = reverse_lazy('accounts:list_category')
  template_name = 'tasks/delete_category.html'
  context_object_name = 'category'


class ListCategory(ListView):
  model = Category
  template_name = 'tasks/list_category.html'
  context_object_name = 'all_categories'


class DetailCategory(DetailView):
  model = Category
  context_object_name = 'category'
  template_name = 'tasks/detail_category.html'


