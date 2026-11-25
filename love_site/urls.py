from django.urls import path

from invites import views

urlpatterns = [
    path('', views.index, name='index'),
    path('yes/', views.yes, name='yes'),
]
