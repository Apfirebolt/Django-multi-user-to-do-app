from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import reverse
from django.views.generic import FormView, ListView, UpdateView, View
from . forms import UserRegistrationForm
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from . models import CustomUser


class RegisterUser(FormView):
  form_class = UserRegistrationForm
  template_name = 'accounts/register.html'
  success_url = 'dashboard'

  def form_valid(self, form):
    # perform a action here
    print(form.cleaned_data)
    form.save()
    return HttpResponseRedirect(reverse('accounts:login'))


class LoginView(View):

  def post(self, request):
    email = request.POST['email']
    password = request.POST['password']
    user = authenticate(username=email, password=password)
    print('Request post data : ', user)

    return render(request, "home.html")

  def get(self, request):
    return render(request, 'accounts/login.html', {})