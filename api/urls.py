from django.urls import path
from api import views

urlpatterns = [
    path('products', views.ProductView.as_view()),
    path('inventory', views.InventoryList.as_view()),
    path('inbound', views.InboundView.as_view()),
    path('outbound', views.OutboundView.as_view()),
    path('login', views.login),
    path('logout', views.logout),
    path('', views.main)
]