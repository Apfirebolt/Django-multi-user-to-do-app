from django.shortcuts import render
from django.contrib.auth import login
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse, reverse_lazy
from django.views.generic import FormView, ListView, UpdateView, View
from django.http import HttpResponseBadRequest
from . forms import UserRegistrationForm
from django.contrib.auth import authenticate
from . models import CustomUser, FriendRequest
from django.contrib import messages
from datetime import datetime


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


class DisplayAllUsers(ListView):
  model = CustomUser
  template_name = 'accounts/all_users.html'
  context_object_name = 'all_users'

  def get_queryset(self):
    # Exclude the current logged in user from the qs
    qs = CustomUser.objects.exclude(id=self.request.user.id)
    return qs

  def get_context_data(self, *, object_list=None, **kwargs):
    context = super(DisplayAllUsers, self).get_context_data()
    sent_requests = [int(x.send_to.id) for x in FriendRequest.objects.filter(send_from=self.request.user)]
    print(sent_requests)
    received_requests = [int(x.send_from.id) for x in FriendRequest.objects.filter(send_to=self.request.user)]
    print(received_requests)
    context['sent_requests'] = sent_requests
    context['received_requests'] = received_requests
    return context


class ConfirmFriend(View):
  def get(self, request, pk):
    currentUser = CustomUser.objects.get(id=pk)
    return render(request, 'accounts/add_friend_confirm.html', {'user': currentUser})

  def post(self, *args, **kwargs):
    try:
      userObj = CustomUser.objects.get(id=self.kwargs['pk'])
      friendReqObj = FriendRequest(send_from=self.request.user, send_to=userObj)
      friendReqObj.save()
      messages.add_message(self.request, messages.SUCCESS,
                           'Friend Request was sent to this user with email %s !' % (userObj.email))
    except Exception as Err:
      return HttpResponseBadRequest('Some error occurred', Err)
    return HttpResponseRedirect(reverse_lazy('accounts:all_users'))


class DeleteFriendRequest(View):
  def get(self, request, pk):
    currentUser = CustomUser.objects.get(id=pk)
    return render(request, 'accounts/delete_friend_request.html', {'user': currentUser})

  def post(self, *args, **kwargs):
    try:
      userObj = CustomUser.objects.get(id=self.kwargs['pk'])
      friendReqObj = FriendRequest.objects.filter(send_from=self.request.user, send_to=userObj).delete()
      messages.add_message(self.request, messages.SUCCESS,
                           'Friend Request to this user with email %s was deleted!' % (userObj.email))
    except Exception as Err:
      return HttpResponseBadRequest('Some error occurred', Err)
    return HttpResponseRedirect(reverse_lazy('accounts:all_users'))


class AcceptFriendRequest(View):
  def get(self, request, pk):
    currentUser = CustomUser.objects.get(id=pk)
    return render(request, 'accounts/accept_friend_request.html', {'user': currentUser})

  def post(self, *args, **kwargs):
    try:
      userObj = CustomUser.objects.get(id=self.kwargs['pk'])
      friendRequestObj = FriendRequest.objects.get(send_to=self.request.user, send_from=userObj)
      friendRequestObj.is_accepted = True
      friendRequestObj.accepted_at = datetime.now()
      friendRequestObj.save()
      messages.add_message(self.request, messages.SUCCESS,
                           'Congratulations, you are now friends with this user with email %s!' % (userObj.email))
    except Exception as Err:
      print(Err)
      return HttpResponseBadRequest('Some error occurred')
    return HttpResponseRedirect(reverse_lazy('accounts:all_users'))
