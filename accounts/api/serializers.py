from rest_framework import serializers
from accounts.models import CustomUser
from . validators import userNameValidator


class AccountSerializer(serializers.HyperlinkedModelSerializer):
  password = serializers.CharField(
    write_only=True,
    required=True,
    help_text='Leave empty if no change needed',
    style={'input_type': 'password', 'placeholder': 'Password'},
    error_messages={
      "blank": "Password may not be left blank.",
      "min_length": "Password too short.",
    },
  )
  user_name = serializers.CharField(
    required=True,
    help_text='User Name, a required field!',
    style={'input_type': 'text', 'placeholder': 'Enter Your Username'},
    validators=[userNameValidator],
    error_messages={
      "blank": "User name might not be left blank, so populate it with something.",
      "required": "User Name is a required field",
      "unique": u"You are already subscribed to our news",
    },
  )

  # Validation applied on individual fields.
  def validate_user_name(self, value):
    """
    Custom validation function written for the username field.
    """
    if value == 'django':
      raise serializers.ValidationError("Blog post is not about Django")
    return value

  def validate_email(self, value):
    """
    Check that the blog post is about Django.
    """
    if value == 'django@gmail.com':
      raise serializers.ValidationError("Django email is not possible")
    return value

  def validate(self, data):
    """
    This is how validation is applied at serializer level
    """
    if data['user_name'] == 'XYZ':
      raise serializers.ValidationError("XYZ is not a valid username :)")

    if data['email'] == 'abc@gmail.com':
      raise serializers.ValidationError("XYZ@gmail.com is not a valid email ID :)")
    return data

  class Meta:
    model = CustomUser
    fields = ('user_name', 'email', 'password', 'user_bio')


class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = CustomUser
    fields = ('user_name', 'email', 'user_bio', 'is_active', 'is_staff', 'id', 'password',)
