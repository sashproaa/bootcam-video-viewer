from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.salesforce.views import SalesforceOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from django.db.models import Case, When, ExpressionWrapper, F, Q
from django.utils import timezone
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadonly
from .serializers import *


class UserProfileApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.filter()
    serializer_class = UserProfileDetail
    permission_classes = (IsAuthenticated, IsAuthenticatedOrReadOnly)


class ProjectListApiView(generics.ListAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectListSerializer
    permission_classes = (IsAdminUser, )


class ProjectCreateApiView(generics.CreateAPIView):
    serializer_class = ProjectDetailSerializer
    permission_classes = (IsAdminUser, )


class ProjectDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projects.objects.filter()
    serializer_class = ProjectDetailSerializer
    permission_classes = (IsAdminUser, )


class VideoListApiView(generics.ListAPIView):
    queryset = Video.objects.all().annotate(paid_video=Case(
        When(videocontent__data_end__gte=timezone.now(), then=F('videocontent__data_end')),
        output_field=models.DateTimeField()))  # пока не смог связать с юзером (пока дает все даже чужое)
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['genre', 'title']
    serializer_class = VideoListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = VideoPagination

class VideoContentListApiView(generics.ListAPIView):
    queryset = VideoContent.objects.all()
    serializer_class = VideoContentDetailSerializer
    permission_classes = (IsOwnerOrReadonly, IsAuthenticatedOrReadOnly)


class VideoContentCreateApiView(generics.CreateAPIView):
    serializer_class = VideoContentCreateSerializer
    permission_classes = (IsOwnerOrReadonly, IsAuthenticatedOrReadOnly)


class VideoApiView(generics.RetrieveUpdateDestroyAPIView, generics.CreateAPIView):
    queryset = Video.objects.filter()
    serializer_class = VideoDetailSerializer
    permission_classes = (IsOwnerOrReadonly, IsAuthenticatedOrReadOnly,)


class TransactionsApiView(generics.ListAPIView, generics.CreateAPIView):
    queryset = Transactions.objects.filter()
    serializer_class = TransactionsDetailSerializer
    permission_classes = (IsAuthenticated, IsAuthenticatedOrReadOnly)

    # def create(self, request, *args, **kwargs):
    #     pass


class ProjectSubscriptionsApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectSubscriptions.objects.filter()
    serializer_class = ProjectSubscriptionsDetail
    permission_classes = (IsAdminUser, )


class ProjectSubscriptionsListApiView(generics.ListAPIView):
    queryset = ProjectSubscriptions.objects.all()
    serializer_class = ProjectSubscriptionsDetail
    permission_classes = (IsAdminUser, )


class VideoSubscriptionApiView(generics.ListAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = VideoSubscriptions.objects.all()
    serializer_class = VideoSubscriptionListSerializer
    permission_classes = (IsAdminUser, )


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


