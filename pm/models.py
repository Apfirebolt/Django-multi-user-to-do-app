from django.db import models
from django_to_do.settings import AUTH_USER_MODEL


class PersonalMessage(models.Model):
  send_from = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_from')
  send_to = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_to')
  content = models.TextField()
  send_at = models.DateTimeField(auto_now=True)
  is_reply = models.BooleanField(default=True)
  parent_message = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)

  def __str__(self):
    return str(self.content)

  class Meta:
    verbose_name_plural = "Personal Messages"


