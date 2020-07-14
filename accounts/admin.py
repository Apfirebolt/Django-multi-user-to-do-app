from django.contrib import admin
from . models import CustomUser, FriendRequest, SingleFriend


admin.site.register(CustomUser)
admin.site.register(FriendRequest)
admin.site.register(SingleFriend)

# Register your models here.
