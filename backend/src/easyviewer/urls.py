from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('project/create/', ProjectCreateApiView.as_view()),
    path('project/<int:pk>', ProjectDetailApiView.as_view()),
    path('project/list/', ProjectListApiView.as_view()),
    path('video/list/', VideoListApiView.as_view()),
    path('video/<int:pk>', VideoApiView.as_view()),
    path('user/<int:pk>', UserProfileApiView.as_view()),
    path('user/transactions', TransactionsApiView.as_view()),
]
