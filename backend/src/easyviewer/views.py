import json
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.salesforce.views import SalesforceOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from django.db.models import Case, When, ExpressionWrapper, F, Q
from django.utils import timezone
from rest_framework import generics, request
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
    pagination_class = VideoPagination
    serializer_class = VideoListSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['genre', 'title']

    temp = ""

    def get(self, request, *args, **kwargs):

        self.temp = request.GET.get('temp')
        print("Get request user_id", request.user.id)
        return super(VideoListApiView, self).get(request, *args, **kwargs)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = Video.objects.all().annotate(video_url=Case(
                When(Q(videocontent__data_end__gte=timezone.now()) & Q(videocontent__user_id=self.request.user.id),
                     then=F('url')),
                output_field=models.CharField()))
        else:
            queryset = Video.objects.all()
        return queryset


class VideoContentListApiView(generics.ListAPIView):
    queryset = VideoContent.objects.all()
    serializer_class = VideoContentDetailSerializer
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        self.temp = request.GET.get('temp')
        print("Get request user_id", request.user.id)
        return super(VideoContentListApiView, self).get(request, *args, **kwargs)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = VideoContent.objects.filter(user_id=self.request.user.id)
        else:
            queryset = None
        return queryset


class VideoApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.filter()
    serializer_class = VideoDetailSerializer
    permission_classes = (IsOwnerOrReadonly, IsAuthenticatedOrReadOnly,)


class VideoCreateApiView(generics.CreateAPIView):
    queryset = Video.objects.filter()
    serializer_class = VideoDetailSerializer
    permission_classes = (IsOwnerOrReadonly, IsAuthenticatedOrReadOnly,)


class TransactionsListApiView(generics.ListAPIView):

    serializer_class = TransactionsDetailSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    temp = ""

    def get(self, request, *args, **kwargs):

        self.temp = request.GET.get('temp')
        print("Get request user_id", request.user.id)
        return super(TransactionsListApiView, self).get(request, *args, **kwargs)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = Transactions.objects.filter(user_id=self.request.user.id)
        else:
            queryset = None
        return queryset


class TransactionsApiView(generics.CreateAPIView):
    serializer_class = MerchantFondySerializer
    permission_classes = (IsAuthenticated, IsAuthenticatedOrReadOnly)

    def create(self, request, *args, **kwargs):
        post_obj = self.request.data
        # user = self.request.user.id # берем из реквеста банка (фронт записал туда id)
        if post_obj['order_status'] == 'approved':
            json_description = post_obj
            price = float(post_obj['amount']) / 100  # может есть по прощче перенести знак на два чила
            status = 'Payed'  # post_obj['order_status']  тут у нас не совпадают чойс філди
            title = post_obj['order_id']  # надо что то придумать может что то другое
            created_at = timezone.now()
            merchant_data = json.loads(post_obj['merchant_data'])[0]
            instance_id = merchant_data['value']['id']
            user = merchant_data['value']['userId']
            project_id = merchant_data['value']['projectId']
            transactions_data = {
                'user_id': user, 'title': title, 'stutus': status, 'price': price,
                'project_id': project_id, 'json_description': json_description,
                'created_at': created_at, 'videocontent': None            }
            transaction = TransactionsDetailSerializer(data=transactions_data)
            if transaction.is_valid():
                transaction_obj = transaction.save()
            else:
                print(transaction.errors)
                raise
            if 'video' == merchant_data['value']['target']:
                video = Video.objects.get(id=instance_id)
                video_id = instance_id
                sub = video.subscription
                subs = VideoSubscriptions.objects.get(video=video_id)
                subscription = subs.id
                duration = video.duration
            elif 'subscription' == merchant_data['value']['target']:  # тут проблема когда подписка нечего записивать в відео id
                subscription = VideoSubscriptions.objects.get(id=instance_id)
                duration = subscription.duration
            data_start = timezone.now()
            data_end = timezone.now() + duration
            videocontent_data = {
                'transaction_id': transaction_obj.id,
                'data_start': data_start, 'data_end': data_end, 'user_id': user, 'video_id': video_id,
                'video_subscription': subscription
            }
            videocontent = VideoContentCreateSerializer(data=videocontent_data)
            transaction.videocontent = videocontent
            if videocontent.is_valid():
                videocontent.save()
            else:
                print(videocontent.errors)
                raise
            return Response(transaction.data)


class ProjectSubscriptionsApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectSubscriptions.objects.filter()
    serializer_class = ProjectSubscriptionsDetail
    permission_classes = (IsAdminUser, )


class ProjectSubscriptionsListApiView(generics.ListAPIView):
    queryset = ProjectSubscriptions.objects.all()
    serializer_class = ProjectSubscriptionsDetail


class VideoSubscriptionApiView(generics.ListAPIView):
    queryset = VideoSubscriptions.objects.all()
    serializer_class = VideoSubscriptionListSerializer


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
