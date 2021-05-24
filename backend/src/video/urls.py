from allauth.account.views import ConfirmEmailView
from dj_rest_auth.registration.views import VerifyEmailView, RegisterView
from dj_rest_auth.views import LoginView, LogoutView
from django.contrib import admin
from django.urls import path, include, re_path
from .yasg import urlpatterns as doc_api


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/autн_base/', include('rest_framework.urls')),
    path('api/', include('easyviewer.urls')),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('api-auth/', include('dj_rest_auth.urls')),
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    path('api-auth/registration/', RegisterView.as_view()),
    path('verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),

]

urlpatterns += doc_api
