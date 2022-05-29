from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django_to_do import settings
from django.views.generic import TemplateView
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-docs', schema_view),
    # path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('error', TemplateView.as_view(template_name='error_page.html'), name='error'),
    path('accounts/', include(('accounts.urls', 'accounts'), namespace='accounts')),
    path('api/', include(('api.urls', 'api'), namespace='api')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
