from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .models import *
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
    permission_classes = (IsAdminUser, IsAuthenticatedOrReadOnly)


class ProjectDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Projects.objects.filter()
    serializer_class = ProjectDetailSerializer
    permission_classes = (IsAdminUser, IsAuthenticatedOrReadOnly)


class VideoListApiView(generics.ListAPIView):
    if IsAuthenticated:
        pass
    queryset = Video.objects.all()
    serializer_class = VideoListSerializer


class VideoApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.filter()
    serializer_class = VideoDetailSerializer
    permission_classes = (IsAdminUser, IsAuthenticatedOrReadOnly)


class TransactionsApiView(generics.ListAPIView):
    queryset = Transactions.objects.filter()
    serializer_class = TransactionsDetail
    permission_classes = (IsAuthenticated, IsAuthenticatedOrReadOnly)
