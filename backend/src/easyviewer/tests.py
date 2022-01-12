from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from .models import *
from .serializers import *
# Create your tests here.

client = Client()


class GetAllVideosTest(TestCase):
    """ Test module for GET all videos API """

    def setUp(self):
        # create user
        User.objects.create_user(email='user@user.com', password=5)

        # create ProjectSubscription
        ProjectSubscriptions.objects.create(
            name='ProjectSubscriptions', description='ProjectSubscriptions',
            disk_size=1, fee=1.00, price=1.00, duration=25
        )

        # create Project
        Projects.objects.create(
            name='Projects', user_id=1, subscription_id=1
        )

        # create VideoSubscription
        VideoSubscriptions.objects.create(
            name='VideoSubscriptions', description='VideoSubscriptions',
            duration=30, price=15.00, project_id=1
        )

        # create Videos
        Video.objects.create(
            title='Casper1', project_id=1, description='Bull Dog1', actors='Black1', price=5.21,
            duration=50, subscription=1, url='', bucket_name='', blob_name='')
        Video.objects.create(
            title='Casper2', project_id=1, description='Bull Dog2', actors='Black2', price=5.22,
            duration=50, subscription=1, url='', bucket_name='', blob_name='')
        Video.objects.create(
            title='Casper3', project_id=1, description='Bull Dog3', actors='Black3', price=5.23,
            duration=50, subscription=1, url='', bucket_name='', blob_name='')
        Video.objects.create(
            title='Casper4', project_id=1, description='Bull Dog4', actors='Black4', price=5.24,
            duration=50, subscription=1, url='', bucket_name='', blob_name='')

    def test_get_all_videos(self):
        # get API response
        response = client.get('api/video/list/')
        # get data from db
        videos = Video.objects.all()
        serializer = VideoListSerializer(videos, many=True)
        self.assertEqual(response.data, serializer.data, msg='VideoListSerializer')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_video(self):
        # get API response
        response = client.get('api/video/1')
        # get data from db
        video = Video.objects.filter(title='Casper1')
        serializer = VideoDetailSerializer(video, many=True)
        self.assertEqual(response.data, serializer.data, msg='VideoDetailSerializer')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_create_video(self):
        # get API response
        response = client.post('api/video/create/')
        # get data from db
        video = Video.objects.create(title='Casper6', project_id=1, description='Bull Dog6',
                                     actors='Black6', price=5.25, duration=150, subscription=1, url='',
                                     bucket_name='', blob_name='')
        serializer = VideoCreateSerializer(video, many=True)
        self.assertEqual(response.data, serializer.data, msg='VideoCreateSerializer')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
