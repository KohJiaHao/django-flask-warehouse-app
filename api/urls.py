from django.urls import path
from .views import main, ProductView

urlpatterns = [
    path('products/', ProductView.as_view()),
    path('', main)
]