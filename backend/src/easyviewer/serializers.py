from dj_rest_auth.serializers import LoginSerializer
from django.db import transaction

from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
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


class TransactionsDetail(serializers.ModelSerializer):
    class Meta:
        model = Transactions
        fields = '__all__'


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