from allauth.account.views import ConfirmEmailView
from dj_rest_auth.registration.views import VerifyEmailView, RegisterView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.authtoken import views
from .yasg import urlpatterns as doc_api
from django.conf import settings
from django.conf.urls.static import static
from .settings import SWAGGER
from easyviewer import views as custom_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('autн-base/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token, name='api_token_auth'),
    path('api/', include('easyviewer.urls')),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('api-auth/password/reset/', custom_views.UserForgotPassword.as_view(), name='rest_password_reset'),
    path('api-auth/', include('dj_rest_auth.urls')),
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    path('api-auth/registration/', RegisterView.as_view()),
    path('verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    path('dj-rest-auth/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('api-auth/password-reset/', custom_views.CustomResetPasswordView.as_view()),
    path('api-auth/password-reset-confirm/<slug:uidb64>/<slug:token>/',
         custom_views.CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('api-auth/password-reset-done',
         custom_views.CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
    path('api-auth/password-reset-complete',
         custom_views.CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),

]
if SWAGGER:
    urlpatterns += doc_api
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)