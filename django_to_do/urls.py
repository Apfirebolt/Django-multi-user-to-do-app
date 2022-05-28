from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django_to_do import settings
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('error', TemplateView.as_view(template_name='error_page.html'), name='error'),
    path('accounts/', include(('accounts.urls', 'accounts'), namespace='accounts')),
    path('api/', include(('api.urls', 'api'), namespace='api')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
