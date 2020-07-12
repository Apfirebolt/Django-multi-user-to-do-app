from django.shortcuts import render
from django.views.generic import FormView, DetailView, DeleteView, UpdateView, ListView
from . models import Task, Category
from . forms import CreateCategoryForm, CreateTaskForm
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages


class CreateTask(LoginRequiredMixin, FormView):
  form_class = CreateTaskForm
  template_name = 'tasks/create_task.html'
  success_message = "Task was successfully created!"

  def form_valid(self, form):
    # perform a action here
    print(form.cleaned_data)
    form.save()
    messages.success(self.request, self.success_message)
    return HttpResponseRedirect(reverse('accounts:dashboard'))


class UpdateTask(UpdateView):
  model = Task
  fields = ['name', 'description', 'category', 'priority', 'deadline_date']


class DeleteTask(LoginRequiredMixin, DeleteView):
  model = Task
  success_url = reverse_lazy('accounts:list_category')
  template_name = 'tasks/delete_task.html'
  context_object_name = 'task'
  success_message = "Task was successfully deleted!"

  def delete(self, request, *args, **kwargs):
    messages.success(self.request, self.success_message)
    return super(DeleteTask, self).delete(request, *args, **kwargs)


class ListTask(LoginRequiredMixin, ListView):
  model = Task
  template_name = 'tasks/list_task.html'
  context_object_name = 'all_tasks'


class DetailTask(LoginRequiredMixin, DetailView):
  model = Task
  context_object_name = 'task'
  template_name = 'tasks/detail_task.html'


class CreateCategory(LoginRequiredMixin, FormView):
  form_class = CreateCategoryForm
  template_name = 'tasks/create_category.html'
  success_message = "Category was successfully created!"

  def form_valid(self, form):
    # perform a action here,
    category_obj = form.save(commit=False)
    category_obj.created_by = self.request.user
    category_obj.save()
    messages.success(self.request, self.success_message)

    return HttpResponseRedirect(reverse('accounts:dashboard'))


class UpdateCategory(LoginRequiredMixin, UpdateView):
  model = Category
  fields = ['name', 'description', 'category_image']
  context_object_name = 'category'
  template_name = 'tasks/update_category.html'
  success_message = "Category was successfully updated!"

  def get_success_url(self):
    messages.success(self.request, self.success_message)
    return reverse_lazy('accounts:list_category')


class DeleteCategory(LoginRequiredMixin, DeleteView):
  model = Category
  success_url = reverse_lazy('accounts:list_category')
  template_name = 'tasks/delete_category.html'
  context_object_name = 'category'
  success_message = "Category was successfully deleted!"

  def delete(self, request, *args, **kwargs):
    messages.success(self.request, self.success_message)
    return super(DeleteCategory, self).delete(request, *args, **kwargs)


class ListCategory(LoginRequiredMixin, ListView):
  model = Category
  template_name = 'tasks/list_category.html'
  context_object_name = 'all_categories'

  def get_queryset(self):
    qs = Category.objects.filter(created_by=self.request.user)
    return qs


class DetailCategory(LoginRequiredMixin, DetailView):
  model = Category
  context_object_name = 'category'
  template_name = 'tasks/detail_category.html'


