from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # API Documentation (DRF Spectacular)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api-docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # Template Routes
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('error/', TemplateView.as_view(template_name='error_page.html'), name='error'),

    # API Endpoints
    path('api/', include(('api.urls', 'api'), namespace='api')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)