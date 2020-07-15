from django.db import models
from django_to_do.settings import AUTH_USER_MODEL


class Topic(models.Model):
  title = models.CharField(max_length=200)
  description = models.TextField()
  created_by = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now=True)
  allow_replies = models.BooleanField(default=True)

  def __str__(self):
    return str(self.title)

  class Meta:
    verbose_name_plural = "Topics"


class ThreadReplies(models.Model):
  content = models.TextField()
  written_by = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
  written_at = models.DateTimeField(auto_now=True)
  is_reply = models.BooleanField(default=False)

  def __str__(self):
    return str(self.content)

  class Meta:
    verbose_name_plural = "Thread Replies"
