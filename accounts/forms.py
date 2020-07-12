from django import forms
from . models import CustomUser


class UserRegistrationForm(forms.ModelForm):
  error_messages = {
    'password_mismatch': ("The two password fields didn't match."),
    'username_required': ("User name is a required field.")
  }
  password1 = forms.CharField(label=("Password"),
                              widget=forms.PasswordInput)
  password2 = forms.CharField(label=("Password confirmation"),
                              widget=forms.PasswordInput,
                              help_text=("Enter the same password as above, for verification."))
  user_name = forms.CharField(label=("Please Enter Username"),
                              widget=forms.TextInput)

  class Meta:
    model = CustomUser
    fields = ['user_name', 'email', 'user_bio']

  def clean_password2(self):
    password1 = self.cleaned_data.get("password1")
    password2 = self.cleaned_data.get("password2")
    if password1 and password2 and password1 != password2:
      raise forms.ValidationError(
        self.error_messages['password_mismatch'],
        code='password_mismatch',
      )
    return password2

  def clean_user_name(self):
    user_name = self.cleaned_data.get('user_name')
    if not user_name:
      raise forms.ValidationError(
        self.error_messages['username_required'],
        code='username_required'
      )
    return user_name

  def save(self, commit=True):
    user = super(UserRegistrationForm, self).save(commit=False)
    user.set_password(self.cleaned_data["password1"])
    if commit:
      user.save()
    return user

