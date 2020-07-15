from rest_framework import serializers
from accounts.models import CustomUser


class AccountSerializer(serializers.ModelSerializer):
  password1 = serializers.SerializerMethodField()
  password2 = serializers.SerializerMethodField()

  def get_password1(self):
    return self.password1

  def get_password2(self):
    return self.password2

  class Meta:
    model = CustomUser
    fields = ('user_name', 'email', 'user_bio')


class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = CustomUser
    fields = ('user_name', 'email', 'user_bio', 'is_active', 'is_staff', 'id',)
