from django.http import HttpResponseForbidden
from django.views.generic.detail import SingleObjectMixin


class DeleteTaskMixin(SingleObjectMixin):
  def get_context_data(self, **kwargs):
    context = super(DeleteTaskMixin, self).get_context_data()
    context['Rio'] = 18
    return context

