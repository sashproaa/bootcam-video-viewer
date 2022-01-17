from rest_framework import status
from rest_framework.test import APITestCase
from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone

from .models import *
from .serializers import *
from .views import *
# Create your tests here.

#client = Client()


class GetAllVideosTest(TestCase):
    """ Test module for GET all videos API """

    def setUp(self):
        # create user
        User.objects.create_user(email='user@user.com', password=5, first_name='first_name' )

        # create ProjectSubscription
        ProjectSubscriptions.objects.create(
            name='ProjectSubscriptions', description='ProjectSubscriptions',
            disk_size=1, fee=1.00, price=1.00, duration='00:00:30'
        )
        self.user = User.objects.get(email='user@user.com')
        # create Project
        self.projectSubscriptions = ProjectSubscriptions.objects.get(name='ProjectSubscriptions')
        self.projects = Projects.objects.create(
            name='Projects',subscription_id=self.projectSubscriptions, bucket_name='12_12_12'
        )
        self.projects.user_id.set((self.user, ), through_defaults={'isAdmin': False})
        # create VideoSubscription
        VideoSubscriptions.objects.create(
            name='VideoSubscriptions', description='VideoSubscriptions',
            duration='00:00:30', price=15.00, project_id=self.projects
        )
        self.videoSubscriptions = VideoSubscriptions.objects.get(name='VideoSubscriptions')
        # create Videos
        self.video1 = Video.objects.create(
            title='Casper1', project_id=self.projects, description='Bull Dog1', actors='Black1', price=5.21,
            duration='00:00:30', url='Bull Dog1', file_name='')
        self.video1.subscription.set((self.videoSubscriptions, self.videoSubscriptions,))
        self.video2 = Video.objects.create(
            title='Casper2', project_id=self.projects, description='Bull Dog2', actors='Black2', price=5.22,
            duration='00:00:30', file_name='')
        self.video2.subscription.set((self.videoSubscriptions, self.videoSubscriptions,))
        self.video3 = Video.objects.create(
            title='Casper3', project_id=self.projects, description='Bull Dog3', actors='Black3', price=5.23,
            duration='00:00:30', file_name='')
        self.video3.subscription.set((self.videoSubscriptions, self.videoSubscriptions,))
        self.video4 = Video.objects.create(
            title='Casper4', project_id=self.projects, description='Bull Dog4', actors='Black4', price=5.24,
            duration='00:00:30', file_name='')
        self.video4.subscription.set((self.videoSubscriptions, self.videoSubscriptions,))

    def test_get_all_videos_anonymous_user(self):
        # get API response
        c = Client()
        headers = {'HTTP_Hash-Project': self.projects.hash}
        videos = Video.objects.all().annotate(video_url=ExpressionWrapper(F('url'), output_field=models.CharField()))
        response = c.get("/api/video/list/", **headers)

        # get data from db
        serializer = VideoListSerializer(videos, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_video_anonymous_user(self):
        c = Client()
        headers = {'HTTP_Hash-Project': self.projects.hash}
        url = '/api/video/' + str(self.video1.id)
        video = Video.objects.filter(id=self.video1.id).annotate(
                video_url=ExpressionWrapper(F('url'), output_field=models.CharField()),
                comments=Value(list(Comment.objects.filter(video_id=self.video1.id).values(
                    ).annotate(username=F('user_id__first_name'))), output_field=models.TextField()))

        # get API response
        response = c.get(url, **headers)

        # get data from db
        serializer = VideoDetailSerializer(video[0])
        self.assertEqual(response.data, serializer.data, msg='VideoDetailSerializer')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_video_authenticate_user(self):
        """ not paid video """

        c = Client()
        headers = {'HTTP_Hash-Project': self.projects.hash}
        c.login(email='user@user.com', password=5)
        response_url = '/api/video/' + str(self.video1.id)

        url = [self.video1.url]

        video_list = []

        video = Video.objects.filter(id=self.video1.id).annotate(
            video_url=Case(When(Q(id=self.video1.id), then=url), output_field=models.CharField()
                           ),
            paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()
                      ),
            comments=Value(list(Comment.objects.filter(video_id=self.video1.id).values(
                ).annotate(username=F('user_id__first_name'))), output_field=models.TextField()))

        # get API response
        response = c.get(response_url, **headers)

        # get data from db
        serializer = VideoDetailSerializer(video[0])
        self.assertEqual(response.data, serializer.data, msg='VideoDetailSerializer authenticate_user not paid video')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_post_create_video(self):
    #     c = Client()
    #     headers = {'HTTP_Hash-Project': self.projects.hash}
    #     # get API response
    #     project = Projects.objects.get(hash=self.projects.hash)
    #     created_at = timezone.now()
    #     created_at = datetime.datetime.strptime(str(created_at)[:10], '%Y-%m-%d')
    #     print(project.id)
    #     data = {
    #         'title': 'Casper6', 'project_id': project.id, 'description': 'Bull Dog6',
    #         'actors': 'Black6', 'price': 5.25, 'duration': '00:00:30', 'url': 'Bull Dog6', 'file_name': '',
    #         'genre': 'VAUDEVILLE', 'created_at': created_at,
    #     }
    #     response = c.post('/api/video/create/', content_type='application/json', data=data, **headers)
    #     print('response', response.status_code, response.data, response.context)
    #     # get data from db
    #     video = Video.objects.create(title='Casper6', project_id=self.projects, description='Bull Dog6',
    #                                  actors='Black6', price=5.25, duration='00:00:30', url='Bull Dog6', file_name='',
    #                                  genre='VAUDEVILLE', created_at=created_at,
    #                                  )
    #     video.subscription.set((self.videoSubscriptions, self.videoSubscriptions,))
    #     print('video', video)
    #     serializer = VideoCreateSerializer(video, many=False)
    #     self.assertEqual(response.data, serializer.data, msg='VideoCreateSerializer')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
