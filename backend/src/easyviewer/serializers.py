from collections import OrderedDict

from dj_rest_auth.serializers import LoginSerializer
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
    class Meta:
        model = Video
        fields = '__all__'


class VideoContentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoContent
        fields = '__all__'


class VideoListSerializer(serializers.ModelSerializer):
    paid_video = serializers.DateTimeField(default=False, read_only=True, source='VideoContent.data_end')

    class Meta:
        model = Video
        fields = '__all__'


class TransactionsDetailSerializer(serializers.ModelSerializer):
    content = VideoContentDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Transactions
        fields = ('hash', 'user_id', 'title',
                  'status', 'price', 'project_id',
                  'json_description', 'created_at',
                  'content'
                  )


class VideoContentCreateSerializer(serializers.ModelSerializer):
    transaction = TransactionsDetailSerializer(many=True, read_only=True)

    class Meta:
        model = VideoContent
        fields = ('data_start', 'data_end', 'user_id', 'video_id', 'video_subscription', 'transaction')


class ProjectSubscriptionsDetail(serializers.ModelSerializer):
    class Meta:
        model = ProjectSubscriptions
        fields = '__all__'


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


class CustomPagination(LimitOffsetPagination):
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.count),
            ('genre', GENRE_CHOICES),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))
