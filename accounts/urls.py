from django.urls import path, include
from django.views.generic import TemplateView
from . views import (RegisterUser, LoginView, DisplayAllUsers, ConfirmFriend, DeleteFriendRequest,
                     AcceptFriendRequest, FriendList, RemoveFriend)
import django.contrib.auth.views as AuthViews
from tasks.views import (CreateTask, DeleteTask, DetailTask, ListTask, UpdateTask, CreateCategory,
                          UpdateCategory, DeleteCategory, DetailCategory, ListCategory, CategoryTasks)


urlpatterns = [
    path('api/', include(('accounts.api.urls', 'accounts_api'), namespace='accounts_api')),
    path('login', LoginView.as_view(), name='login'),
    path('logout/', AuthViews.LogoutView.as_view(), name='logout'),
    path('register', RegisterUser.as_view(), name='register'),
    path('all_users', DisplayAllUsers.as_view(), name='all_users'),
    path('add_friend/<int:pk>', ConfirmFriend.as_view(), name='add_friend'),
    path('remove_friend/<int:pk>', RemoveFriend.as_view(), name='remove_friend'),
    path('friend_list', FriendList.as_view(), name='friend_list'),
    path('delete_friend_request/<int:pk>', DeleteFriendRequest.as_view(), name='delete_friend_request'),
    path('accept_friend_request/<int:pk>', AcceptFriendRequest.as_view(), name='accept_friend_request'),
    path('dashboard', TemplateView.as_view(template_name='accounts/dashboard.html'), name='dashboard'),
    path('', TemplateView.as_view(template_name='accounts/accounts_home.html'), name='accounts_home'),
    path('create_task', CreateTask.as_view(), name='create_task'),
    path('list_task', ListTask.as_view(), name='list_task'),
    path('detail_task/<int:pk>', DetailTask.as_view(), name='detail_task'),
    path('update_task/<int:pk>', UpdateTask.as_view(), name='update_task'),
    path('delete_task/<int:pk>', DeleteTask.as_view(), name='delete_task'),
    path('list_category', ListCategory.as_view(), name='list_category'),
    path('create_category', CreateCategory.as_view(), name='create_category'),
    path('detail_category/<int:pk>', DetailCategory.as_view(), name='detail_category'),
    path('update_category/<int:pk>', UpdateCategory.as_view(), name='update_category'),
    path('delete_category/<int:pk>', DeleteCategory.as_view(), name='delete_category'),
    path('category_tasks/<int:pk>', CategoryTasks.as_view(), name='category_tasks'),
]