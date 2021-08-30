from allauth.account.views import ConfirmEmailView
from dj_rest_auth.registration.views import VerifyEmailView, RegisterView
from dj_rest_auth.views import LoginView, LogoutView
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.authtoken import views
from .yasg import urlpatterns as doc_api
from django.conf import settings
from django.conf.urls.static import static
from .settings import SWAGGER

urlpatterns = [
    path('admin/', admin.site.urls),
    path('autн-base/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token, name='api_token_auth'),
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
if SWAGGER:
    urlpatterns += doc_api
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)