from django.urls import path
from .views import StringAPI

urlpatterns = [
    path('api/strings/', StringAPI.as_view(), name='string_api'),
]
