from django.db import models
from django_to_do.settings import AUTH_USER_MODEL


class Category(models.Model):
  name = models.CharField('Category Name', max_length=200)
  description = models.TextField('Category Description')
  category_image = models.ImageField(upload_to='category_images')
  created_at = models.DateTimeField(auto_now=True)
  created_by = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)

  class Meta:
    verbose_name_plural = "Categories"

  def __str__(self):
    return str(self.name)


class Task(models.Model):
  name = models.CharField('Task Name', max_length=200)
  description = models.TextField('Task Description')
  deadline_date = models.DateField('Task Deadline Date')
  priority = models.IntegerField('Task Priority')
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
  created_by = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
  created_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return str(self.name) + ' - ' + str(self.category.name)

  class Meta:
    verbose_name_plural = "Tasks"
