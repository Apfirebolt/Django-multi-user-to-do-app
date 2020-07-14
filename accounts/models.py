from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin


class MyUserManager(BaseUserManager):
  def create_superuser(self, email, password):
    user = self.model(email=email)
    user.set_password(password)
    user.is_superuser = True
    user.is_active = True
    user.is_staff = True
    user.save(using=self._db)
    return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField("Email", unique=True, max_length=255, blank=True, null=True)
    user_name = models.CharField("User Name", unique=True, max_length=255, blank=True, null=True)
    user_bio = models.TextField(blank=True)
    is_active = models.BooleanField('Active', default=True, blank=True, null=True)
    is_staff = models.BooleanField('Staff', default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    objects = MyUserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
      return self.email


class FriendRequest(models.Model):
  send_from = models.ForeignKey(CustomUser, related_name='user_sent_from', on_delete=models.CASCADE)
  send_to = models.ForeignKey(CustomUser, related_name='user_sent_to', on_delete=models.CASCADE)
  is_accepted = models.BooleanField(default=False)
  sent_at = models.DateTimeField(auto_now=True)
  accepted_at = models.DateTimeField(blank=True, null=True)

  class Meta:
    verbose_name_plural = "Friend Requests"

  def __str__(self):
    return str(self.send_from) + '-' + str(self.send_to)


class SingleFriend(models.Model):
    friend_of = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='friend_of')
    all_friends = models.ManyToManyField(CustomUser, related_name='all_friends')

    def __str__(self):
      return str(self.friend_of.email)

