from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.contrib.auth import login
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import reverse
from django.views.generic import FormView, ListView, UpdateView, View
from . forms import UserRegistrationForm
from django.contrib.auth import authenticate
from . models import CustomUser
from django.contrib import messages


class RegisterUser(FormView):
  form_class = UserRegistrationForm
  template_name = 'accounts/register.html'
  success_url = 'dashboard'

  def form_valid(self, form):
    # perform a action here
    userObj = form.save(commit=False)
    userObj.staff = False
    userObj.admin = False
    userObj.save()
    messages.add_message(self.request, messages.INFO, 'You have successfully registered, Please login to continue!')
    return HttpResponseRedirect(reverse('accounts:login'))


class LoginView(View):

  def post(self, request):
    email = request.POST['email']
    password = request.POST['password']
    user = authenticate(username=email, password=password)
    if user is not None:
      messages.add_message(self.request, messages.INFO, 'You have successfully logged in! Please continue to your dashboard!')
      login(request, user)
      return HttpResponseRedirect(reverse('accounts:dashboard'))
    else:
      messages.add_message(self.request, messages.ERROR, 'Failed to Login, please try again!')
      return HttpResponseRedirect(self.request.path_info)

  def get(self, request):
    return render(request, 'accounts/login.html', {})