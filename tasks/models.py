from django.db import models
from django_to_do.settings import AUTH_USER_MODEL


class Category(models.Model):
  name = models.CharField(max_length=200)
  description = models.TextField()
  category_image = models.ImageField(upload_to='category_images')
  created_at = models.DateTimeField(auto_now=True)
  created_by = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)

  class Meta:
    verbose_name_plural = "Categories"

  def __str__(self):
    return str(self.name)


class Task(models.Model):
  name = models.CharField(max_length=200)
  description = models.TextField()
  deadline_date = models.DateField()
  priority = models.IntegerField()
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
  created_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return str(self.name) + ' - ' + str(self.category.name)

  class Meta:
    verbose_name_plural = "Tasks"
