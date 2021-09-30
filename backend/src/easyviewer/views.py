import base64
import json

from datetime import timedelta
from decimal import Decimal
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.salesforce.views import SalesforceOAuth2Adapter
from django.contrib.auth import views
from django.contrib import admin
from dj_rest_auth.registration.views import SocialLoginView
from django.db.models import Case, When, ExpressionWrapper, F, Q, Max, Value
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from liqpay import LiqPay
from rest_framework import generics, request
from django.contrib.auth import get_user_model
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import FormParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadonly, IsStaff
from .serializers import *
from .google_cloud_URL import generate_download_signed_url_v4
from video import settings


class UserProfileApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = get_user_model().objects.filter()
    serializer_class = UserProfileDetail
    permission_classes = (IsAuthenticated, IsAuthenticatedOrReadOnly)


class ProjectListApiView(generics.ListAPIView):
    queryset = Projects.objects.all()
    serializer_class = ProjectListSerializer
    permission_classes = (IsAdminUser,)


class ProjectCreateApiView(generics.CreateAPIView):
    serializer_class = ProjectDetailSerializer
    permission_classes = (IsAdminUser,)


class ProjectDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projects.objects.filter()
    serializer_class = ProjectDetailSerializer
    permission_classes = (IsAdminUser,)


class VideoListApiView(generics.ListAPIView):
    pagination_class = VideoPagination
    serializer_class = VideoListSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['genre', ]
    filterset_fields = ['title', 'actors', 'price', ]
    ordering_fields = ['title', 'price', ]

    temp = ""
    hash_project = ""

    def get(self, request, *args, **kwargs):
        self.temp = request.GET.get('temp')
        self.hash_project = request.headers.get('Hash-Project')
        print("Get request user_id", request.user.id)
        return super(VideoListApiView, self).get(request, *args, **kwargs)

    def get_queryset(self):
        project = get_object_or_404(Projects, hash=self.hash_project)
        if self.request.user.is_authenticated and project:
            video_subscriptions_id = VideoSubscriptions.objects.filter(
                project_id=project.id, videocontent__data_end__gte=timezone.now(),
                videocontent__user_id=self.request.user.id).values_list('id', flat=True)
            video_subscriptions_id = list(video_subscriptions_id)
            video_subscriptions_id = video_subscriptions_id if video_subscriptions_id else [-1]
            video_ids_subscriptions = Video.objects.filter(
                subscription__in=video_subscriptions_id).values_list('id', flat=True)
            video_ids_video = Video.objects.filter(
                project_id=project.id, videocontent__data_end__gte=timezone.now(),
                videocontent__user_id=self.request.user.id).values_list('id', flat=True)
            video_list = list(set(list(video_ids_subscriptions) + list(video_ids_video)))
            video_list = video_list if video_list else [-1]
            queryset = Video.objects.filter(project_id=project.id).annotate(
                video_url=ExpressionWrapper(F('url'), output_field=models.CharField()
                ), paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()))
        else:
            queryset = Video.objects.filter(project_id=project.id).annotate(
                video_url=ExpressionWrapper(F('url'), output_field=models.CharField()))
        return queryset


class VideoContentListApiView(generics.ListAPIView):
    pagination_class = VideoPagination
    serializer_class = VideoListSerializer
    permission_classes = (IsAuthenticated,)
    temp = ""
    hash_project = ""

    def get(self, request, *args, **kwargs):
        self.hash_project = request.headers.get('Hash-Project')
        self.temp = request.GET.get('temp')
        print("Get request user_id", request.user.id)
        return super(VideoContentListApiView, self).get(request, *args, **kwargs)

    def get_queryset(self):
        project = get_object_or_404(Projects, hash=self.hash_project)
        if self.request.user.is_authenticated and project:
            video_subscriptions_id = VideoSubscriptions.objects.filter(
                project_id=project.id, videocontent__data_end__gte=timezone.now(),
                videocontent__user_id=self.request.user.id).values_list('id', flat=True)
            video_subscriptions_id = list(video_subscriptions_id)
            video_subscriptions_id = video_subscriptions_id if video_subscriptions_id else [-1]
            video_ids_subscriptions = Video.objects.filter(
                subscription__in=video_subscriptions_id).values_list('id', flat=True)
            video_ids_video = Video.objects.filter(
                project_id=project.id, videocontent__data_end__gte=timezone.now(),
                videocontent__user_id=self.request.user.id).values_list('id', flat=True)
            video_list = list(set(list(video_ids_subscriptions) + list(video_ids_video)))
            video_list = video_list if video_list else [-1]
            queryset = Video.objects.filter(id__in=video_list).annotate(
                video_url=Case(When(Q(id__in=video_list), then=F('url')), default=None, output_field=models.CharField()
                ), paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()))
        else:
            queryset = None
        return queryset


class VideoApiView(generics.RetrieveUpdateDestroyAPIView):  # video.id
    pagination_class = VideoPagination
    serializer_class = VideoDetailSerializer
    permission_classes = (IsStaff, )

    temp = ""
    hash_project = ""

    def get(self, request, *args, **kwargs):
        self.temp = request.GET.get('temp')
        self.hash_project = request.headers.get('Hash-Project')
        print("Get request user_id", request.user.id)
        return super(VideoApiView, self).get(request, *args, **kwargs)

    def get_queryset(self):
        project = get_object_or_404(Projects, hash=self.hash_project)
        video = get_object_or_404(Video, id=self.kwargs.get('pk'))
        bucket_name = project.bucket_name
        blob_name = video.file_name
        url = []  # for annotate
        url.append(video.url)
        if self.request.user.is_authenticated and project:
            video_subscriptions_id = VideoSubscriptions.objects.filter(
                project_id=project.id, videocontent__data_end__gte=timezone.now(),
                videocontent__user_id=self.request.user.id).values_list('id', flat=True)
            video_subscriptions_data_end = video_subscriptions_id.values_list('videocontent__data_end')
            video_subscriptions_id = list(video_subscriptions_id)
            video_subscriptions_id = video_subscriptions_id if video_subscriptions_id else [-1]
            video_ids_subscriptions = Video.objects.filter(
                subscription__in=video_subscriptions_id).values_list('id', flat=True)
            video_ids_video = Video.objects.filter(
                project_id=project.id, videocontent__video_id=self.kwargs.get('pk'),
                videocontent__data_end__gte=timezone.now(), videocontent__user_id=self.request.user.id
                                                                                    ).values_list('id', flat=True)
            video_data_end = video_ids_video.values_list('videocontent__data_end')
            if video_data_end or video_subscriptions_data_end:
                data_end = max(list(list(video_data_end) + list(video_subscriptions_data_end)))
                url = generate_download_signed_url_v4(bucket_name=bucket_name, blob_name=blob_name,
                                                      data_end=data_end[0])
            video_list = list(set(list(video_ids_subscriptions) + list(video_ids_video)))
            video_list = video_list if video_list else [-1]
            queryset = Video.objects.filter(id=video.id).annotate(
                video_url=Case(When(Q(id=self.kwargs.get('pk')), then=url), output_field=models.CharField()
                ), paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()
                ), comments=Value(
                    list(Comment.objects.filter(video_id=video.id).values()), output_field=models.TextField()))
        else:
            queryset = Video.objects.filter(project_id=project.id, id=video.id).annotate(
                video_url=ExpressionWrapper(F('url'), output_field=models.CharField()),
                comments=Value(list(Comment.objects.filter(video_id=video.id).values()),
                               output_field=models.TextField()))
        return queryset


class VideoCreateApiView(generics.CreateAPIView):
    serializer_class = VideoCreateSerializer
    permission_classes = (IsStaff,)


class TransactionsListApiView(generics.ListAPIView):

    serializer_class = TransactionsDetailSerializer
    permission_classes = (IsAuthenticated,)
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


class FondyApiView(generics.CreateAPIView):
    serializer_class = MerchantFondySerializer
    #permission_classes = (IsAuthenticated, IsAuthenticatedOrReadOnly)

    def create(self, request, *args, **kwargs):
        post_obj = self.request.data
        subscription, duration, video_id = None, 0, None
        # user = self.request.user.id # берем из реквеста банка (фронт записал туда id)
        if post_obj['order_status'] == 'approved':
            json_description = post_obj
            # з банка приходит цифра без точки но две последних цифри ето копейки
            # что б не делить сделал по срезу так как при деление может измениться цифра
            price = Decimal(post_obj['amount'][:-2] + '.' + post_obj['amount'][-2:])
            status = 'Payed'  # post_obj['order_status']  тут у нас не совпадают чойс філди
            title = post_obj['order_id']  # надо что то придумать может что то другое
            created_at = timezone.now()
            merchant_data = json.loads(post_obj['merchant_data'])[0]
            merchant_data_val = eval(merchant_data['value'])
            instance_id = int(merchant_data_val['id'])
            user = int(merchant_data_val['userId'])
            project_id = int(merchant_data_val['projectId'])
            transactions_data = {
                'user_id': user, 'title': title, 'stutus': status, 'price': price,
                'project_id': project_id, 'json_description': json_description,
                'created_at': created_at, 'videocontent': None}
            transaction = TransactionsDetailSerializer(data=transactions_data)
            if transaction.is_valid():
                transaction_obj = transaction.save()
            else:
                print(transaction.errors)
                raise
            if 'video' == merchant_data_val['target']:
                video = Video.objects.get(id=instance_id)
                video_id = instance_id
                duration = timedelta(days=30)
            elif 'subscription' == merchant_data_val['target']:
                sub = VideoSubscriptions.objects.get(id=instance_id)
                subscription = sub.id
                duration = sub.period_month * 30
                duration = timedelta(days=duration)
            data_start = timezone.now()
            data_end = data_start + duration
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


class LiqpayCallbackView(generics.CreateAPIView):
    #serializer_class = LiqpaySerializer
    serializer_class = LiqpayEncodeSerializer
    parser_classes = [FormParser]

    def create(self, request, *args, **kwargs):
        subscription, duration, video_id = None, 0, None
        liqpay = LiqPay(settings.LIQPAY_PUBLIC_KEY, settings.LIQPAY_PRIVATE_KEY)
        data = dict(self.request.data)['data'][0]
        signature = dict(self.request.data)['signature'][0]
        sign = liqpay.str_to_sign(settings.LIQPAY_PRIVATE_KEY + data + settings.LIQPAY_PRIVATE_KEY)
        decode_data = liqpay.decode_data_from_str(data=data)
        if sign == signature and decode_data['status'] == 'success':
            print('callback is valid')
            json_description = decode_data
            price = Decimal(decode_data['amount'])
            status = 'Payed'  # тут у нас не совпадают чойс філди
            title = decode_data['order_id']
            created_at = timezone.now()
            merchant_data = decode_data['info']
            merchant_data_val = eval(merchant_data)
            instance_id = int(merchant_data_val['id'])
            user = int(merchant_data_val['userId'])
            project_id = int(merchant_data_val['projectId'])
            transactions_data = {
                'user_id': user, 'title': title, 'stutus': status, 'price': price,
                'project_id': project_id, 'json_description': json_description,
                'created_at': created_at, 'videocontent': None}
            transaction = TransactionsDetailSerializer(data=transactions_data)
            if transaction.is_valid():
                transaction_obj = transaction.save()
            else:
                print(transaction.errors)
                raise
            if 'video' == merchant_data_val['target']:
                video = Video.objects.get(id=instance_id)
                video_id = video.id
                duration = timedelta(days=30)
            elif 'subscription' == merchant_data_val['target']:
                sub = VideoSubscriptions.objects.get(id=instance_id)
                subscription = sub.id
                duration = sub.period_month * 30
                duration = timedelta(days=duration)
            data_start = timezone.now()
            data_end = data_start + duration
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


class CommentApiView(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentListSerializer


class CommentCreateApiView(generics.CreateAPIView):
    serializer_class = CommentDetailSerializer
    permission_classes = (IsAuthenticated, )


class CommentDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.filter()
    serializer_class = CommentDetailSerializer
    permission_classes = (IsOwnerOrReadonly, )


class VideoSubscriptionApiView(generics.ListAPIView):
    serializer_class = VideoSubscriptionListSerializer

    temp = ""
    hash_project = ""

    def get(self, request, *args, **kwargs):
        self.temp = request.GET.get('temp')
        self.hash_project = request.headers.get('Hash-Project')
        print("Get request user_id", request.user.id)
        return super(VideoSubscriptionApiView, self).get(request, *args, **kwargs)

    def get_queryset(self):
        project = get_object_or_404(Projects, hash=self.hash_project)
        if self.request.user.is_authenticated and project:
            subscriptions_paid_id = VideoSubscriptions.objects.filter(
                project_id=project.id, videocontent__data_end__gte=timezone.now(),
                videocontent__user_id=self.request.user.id, videocontent__video_subscription__isnull=False
            ).values_list('id', flat=True)
            subscriptions_paid_id = list(subscriptions_paid_id)
            subscriptions_paid_id = subscriptions_paid_id if subscriptions_paid_id else [-1]
            queryset = VideoSubscriptions.objects.filter(project_id=project.id).annotate(
                data_end=Case(When(Q(id__in=subscriptions_paid_id), then=Max('videocontent__data_end')),
                              default=None, output_field=models.DateField()),
                paid=Case(When(Q(id__in=subscriptions_paid_id), then=True),
                          default=False, output_field=models.BooleanField())).distinct()
        else:
            queryset = VideoSubscriptions.objects.filter(project_id=project.id)
        return queryset


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class CustomResetPasswordView(views.PasswordResetView):
    def get_context_data(self, **kwarg):
        context = super().get_context_data(**kwarg)
        context['site_header'] = getattr(admin.site, 'site_header')
        context['site_title'] = getattr(admin.site, 'site_title')
        return context


class CustomPasswordResetDoneView(views.PasswordResetDoneView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['site_header'] = getattr(admin.site, 'site_header')
        context['site_title'] = getattr(admin.site, 'site_title')
        return context


class CustomPasswordResetConfirmView(views.PasswordResetConfirmView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['site_header'] = getattr(admin.site, 'site_header')
        context['site_title'] = getattr(admin.site, 'site_title')
        return context


class CustomPasswordResetCompleteView(views.PasswordResetCompleteView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['site_header'] = getattr(admin.site, 'site_header')
        context['site_title'] = getattr(admin.site, 'site_title')
        return context
