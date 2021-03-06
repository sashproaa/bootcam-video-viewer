from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('project/create/', ProjectCreateApiView.as_view()),
    path('project-subscriptions/<int:pk>', ProjectSubscriptionsApiView.as_view()),
    path('project-subscriptions/', ProjectSubscriptionsListApiView.as_view()),
    path('project/<int:pk>', ProjectDetailApiView.as_view()),
    path('project/list/', ProjectListApiView.as_view()),
    path('video/subscription/', VideoSubscriptionApiView.as_view()),
    path('video/list/', VideoListApiView.as_view()),
    path('video/content/list/', VideoContentListApiView.as_view()),
    path('video/create/', VideoCreateApiView.as_view()),
    path('video/<int:pk>', VideoApiView.as_view()),
    path('video/create', VideoCreateApiView.as_view()),
    path('video/comment/list', CommentApiView.as_view()),
    path('video/comment/create', CommentCreateApiView.as_view()),
    path('comment/<int:pk>', CommentDetailApiView.as_view()),
    path('user/<int:pk>', UserProfileApiView.as_view()),
    path('user/transactions', LiqpayCallbackView.as_view()),
    path('user/transactions/list/', TransactionsListApiView.as_view()),
    path('facebook/', FacebookLogin.as_view(), name='fb_login')
]
