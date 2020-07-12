from django.shortcuts import render
from django.views.generic import FormView, DetailView, DeleteView, UpdateView, ListView, View
from . models import Task, Category
from . forms import CreateCategoryForm, CreateTaskForm
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages


class CreateTask(View):
  def post(self, request, *args, **kwargs):
    params = request.POST
    categoryObj = Category.objects.get(name=params['category'])
    newTaskObj = Task(
      name=params['name'],
      description=params['description'],
      deadline_date=params['deadline_date'],
      priority=params['priority'],
      category=categoryObj
    )
    newTaskObj.save()
    return HttpResponseRedirect(reverse('accounts:list_category'))

  def get(self, request, *args, **kwargs):
    categories = Category.objects.filter(created_by=request.user)
    return render(request, 'tasks/create_task.html', {'categories': categories})


class UpdateTask(View):
  def post(self, request, *args, **kwargs):
    params = request.POST
    taskObj = Task.objects.get(id=self.kwargs['pk'])
    categoryObj = Category.objects.get(name=params['category'])
    taskObj.name = params['name']
    taskObj.description = params['description']
    taskObj.deadline_date = params['deadline_date']
    taskObj.priority = params['priority']
    taskObj.categoryObj = categoryObj
    taskObj.save()
    return HttpResponseRedirect(reverse('accounts:list_category'))

  def get(self, request, *args, **kwargs):
    taskObj = Task.objects.get(id=self.kwargs['pk'])
    categories = Category.objects.filter(created_by=request.user)
    return render(request, 'tasks/update_task.html', {'categories': categories, 'task': taskObj})


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

  def get_queryset(self):
    allUserCategories = Category.objects.filter(created_by=self.request.user)
    return Task.objects.filter(category_id__in=[int(eachObj.id) for eachObj in allUserCategories])


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


class CategoryTasks(ListView):
  model = Task
  context_object_name = 'tasks'
  template_name = 'tasks/category_tasks.html'

  def get_queryset(self):
    qs = Task.objects.filter(category_id=self.kwargs['pk'])
    return qs

  def get_context_data(self, *, object_list=None, **kwargs):
    context = super(CategoryTasks, self).get_context_data(**kwargs)
    context['category'] = Category.objects.get(id=self.kwargs['pk'])
    return context



