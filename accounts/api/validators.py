from django.core.exceptions import ValidationError


def userNameValidator(value):
  if value == 'Ronaldo':
    raise ValidationError("Ronaldo cannot be a valid value")
  return value