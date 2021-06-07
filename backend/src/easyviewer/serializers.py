from collections import OrderedDict

from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response

from .models import *


class UserProfileDetail(serializers.ModelSerializer, UserManager):
    class Meta:
        MyUser = get_user_model()
        model = MyUser
        fields = '__all__'


class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'


class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = '__all__'


class VideoDetailSerializer(serializers.ModelSerializer):
    video_url = serializers.CharField(read_only=True, default=None)
    paid = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Video
        exclude = ['url']


class VideoCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = '__all__'


class VideoContentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoContent
        fields = '__all__'


class VideoListSerializer(serializers.ModelSerializer):
    video_url = serializers.CharField(read_only=True, default=None)
    paid = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Video
        exclude = ['url']


class VideoSubscriptionListSerializer(serializers.ModelSerializer):
    data_end = serializers.DateTimeField(read_only=True, default=None)
    paid = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = VideoSubscriptions
        fields = '__all__'


class TransactionsDetailSerializer(serializers.ModelSerializer):
    videocontent = VideoContentDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Transactions
        fields = ('hash', 'user_id', 'title',
                  'status', 'price', 'project_id',
                  'json_description', 'created_at',
                  'videocontent'
                  )


class VideoContentCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = VideoContent
        fields = '__all__'


class ProjectSubscriptionsDetail(serializers.ModelSerializer):
    class Meta:
        model = ProjectSubscriptions
        fields = '__all__'


class MerchantFondySerializer(serializers.Serializer):

    transaction = TransactionsDetailSerializer(many=True, read_only=True)

    rrn = serializers.CharField(max_length=255)
    masked_card = serializers.CharField(max_length=255)
    sender_cell_phone = serializers.CharField(max_length=255)
    response_signature_string = serializers.CharField(max_length=255)
    response_status = serializers.CharField(max_length=255)
    sender_account = serializers.CharField(max_length=255)
    fee = serializers.CharField(max_length=255)
    rectoken_lifetime = serializers.CharField(max_length=255)
    reversal_amount = serializers.CharField(max_length=255)
    settlement_amount = serializers.CharField(max_length=255)
    actual_amount = serializers.CharField(max_length=255)
    order_status = serializers.CharField(max_length=255)
    response_description = serializers.CharField(max_length=255)
    verification_status = serializers.CharField(max_length=255)
    order_time = serializers.CharField(max_length=255)
    actual_currency = serializers.CharField(max_length=255)
    order_id = serializers.CharField(max_length=255)
    parent_order_id = serializers.CharField(max_length=255)
    merchant_data = serializers.CharField(max_length=1555)
    tran_type = serializers.CharField(max_length=255)
    eci = serializers.CharField(max_length=255)
    settlement_date = serializers.CharField(max_length=255)
    payment_system = serializers.CharField(max_length=255)
    rectoken = serializers.CharField(max_length=255)
    approval_code = serializers.CharField(max_length=255)
    merchant_id = serializers.CharField(max_length=255)
    settlement_currency = serializers.CharField(max_length=255)
    payment_id = serializers.CharField(max_length=255)
    product_id = serializers.CharField(max_length=255)
    currency = serializers.CharField(max_length=255)
    card_bin = serializers.CharField(max_length=255)
    response_code = serializers.CharField(max_length=255)
    card_type = serializers.CharField(max_length=255)
    amount = serializers.CharField(max_length=255)
    sender_email = serializers.CharField(max_length=255)
    signature = serializers.CharField(max_length=255)


class CustomRegisterSerializer(RegisterSerializer):
    username = None

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.save()
        return user


class CustomLoginSerializer(LoginSerializer):
    username = None


class CustomUserDetailsSerializer(UserDetailsSerializer):
   # UserModel = get_user_model()

    class Meta:
        extra_fields = []
        # see https://github.com/iMerica/dj-rest-auth/issues/181
        # UserModel.XYZ causing attribute error while importing other
        # classes from `serializers.py`. So, we need to check whether the auth model has
        # the attribute or not
        if hasattr(get_user_model(), "USERNAME_FIELD"):
            extra_fields.append(get_user_model().USERNAME_FIELD)
        if hasattr(get_user_model(), "EMAIL_FIELD"):
            extra_fields.append(get_user_model().EMAIL_FIELD)

        model = get_user_model()
        read_only_fields = ('id', 'email',)
        fields = ('id', *extra_fields, 'first_name', 'last_name',  # default fields return
                  'mobile', 'date_of_birth', 'gender', 'avatar',  # plus return custom user model fields
                  # plus return other default user model fields
                  'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions', 'last_login', 'date_joined'
                  )


class VideoPagination(LimitOffsetPagination):
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.count),
            ('genre', GENRE_CHOICES),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))
