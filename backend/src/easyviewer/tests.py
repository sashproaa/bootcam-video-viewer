from rest_framework import status
from rest_framework.test import APITestCase
from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone

from .models import *
from .serializers import *
from .views import *
# Create your tests here.


class GetAllVideosTest(TestCase):
    """ Test module for GET all videos API """

    def setUp(self):
        # create user
        User.objects.create_user(email='user@user.com', password=5, first_name='first_name')

        # create ProjectSubscription
        ProjectSubscriptions.objects.create(
            name='ProjectSubscriptions', description='ProjectSubscriptions',
            disk_size=1, fee=1.00, price=1.00, duration='00:00:30'
        )
        self.user = User.objects.get(email='user@user.com')
        # create Project
        self.projectSubscriptions = ProjectSubscriptions.objects.get(name='ProjectSubscriptions')
        self.projects = Projects.objects.create(
            name='Projects', subscription_id=self.projectSubscriptions, bucket_name='12_12_12'
        )
        self.projects.user_id.set((self.user, ), through_defaults={'isAdmin': False})
        self.headers = {'HTTP_Hash-Project': self.projects.hash}

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

    def add_paid_video(self, obj_project,  obj_user, obj_video=None, obj_video_subscriptions=None):
        """ add paid video to id or to video_subscriptions  """

        json_response_transaction = {  # response from Liqpay
            "ip": "46.200.223.249",
            "info": """{\"target\":\"video\",\"id\":6,\"projectId\":1,
                                   \"name\":\"Ищу работу\",\"targetName\":\"Видео\",\"userId\":2}""",
            "type": "buy",
            "acq_id": 414963,
            "action": "pay",
            "amount": 185.0,
            "is_3ds": 'false',
            "status": "success",
            "mpi_eci": "7",
            "paytype": "card",
            "version": 3,
            "currency": "UAH",
            "end_date": 1638218106263,
            "language": "ru",
            "order_id": "G7TSK7NG1638218094343136",
            "payment_id": 1837429767,
            "public_key": "sandbox_i40353427819",
            "create_date": 1638218106185,
            "description": "Ищу работу",
            "amount_bonus": 0.0,
            "amount_debit": 185.0,
            "sender_bonus": 0.0,
            "amount_credit": 185.0,
            "currency_debit": "UAH",
            "transaction_id": 1837429767,
            "currency_credit": "UAH",
            "liqpay_order_id": "MKU4LO6Q1638218106183227",
            "agent_commission": 0.0,
            "commission_debit": 0.0,
            "sender_card_bank": "Test",
            "sender_card_type": "visa",
            "commission_credit": 5.09,
            "sender_card_mask2": "424242*42",
            "sender_commission": 0.0,
            "receiver_commission": 5.09,
            "sender_card_country": 804
        }
        created_at = timezone.now() - timedelta(days=1)
        data_end = created_at + timedelta(days=30)
        if obj_video_subscriptions:
            """ add paid one videosubscription """
            self.transaction = Transactions.objects.create(
                user_id=obj_user, title='title', price=obj_video_subscriptions.price,
                project_id=obj_project, json_description=json_response_transaction, created_at=created_at)
            self.videoContent = VideoContent.objects.create(
                data_start=created_at, data_end=data_end, user_id=obj_user,
                video_subscription=obj_video_subscriptions, transaction_id=self.transaction)
            return self.transaction, self.videoContent
        elif obj_video:
            """ add paid one video """
            self.transaction = Transactions.objects.create(
                user_id=obj_user, title='title', price=obj_video.price,
                project_id=obj_project, json_description=json_response_transaction, created_at=created_at)
            self.videoContent = VideoContent.objects.create(
                data_start=created_at, data_end=data_end, user_id=obj_user,
                video_id=obj_video, transaction_id=self.transaction)
            return self.transaction, self.videoContent
        else:
            """ must be what is paid """
            return obj_video, obj_video_subscriptions

    def test_get_all_videos_anonymous_user(self):
        # get API response
        c = Client()
        videos = Video.objects.filter(project_id=self.projects.id).annotate(
            video_url=ExpressionWrapper(F('url'), output_field=models.CharField()))

        response = c.get("/api/video/list/", **self.headers)

        # get data from db
        serializer = VideoListSerializer(videos, many=True)
        self.assertEqual(response.data['results'], serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_videos_authenticate_user(self):
        """ when user buy videoSubscriptions or one video"""

        c = Client()
        c.login(email='user@user.com', password=5)

        response_url = "/api/video/list/"

        # add one paid video
        self.add_paid_video(obj_project=self.projects,  obj_user=self.user, obj_video=self.video1)

        video_list = [self.video1.id, ]

        video = Video.objects.filter(project_id=self.projects.id).annotate(
            video_url=Case(When(Q(id__in=video_list), then=F('url')), output_field=models.CharField()),
            paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()))

        response_video = c.get(response_url, **self.headers)

        # add one paid videoSubscriptions
        self.add_paid_video(obj_project=self.projects, obj_user=self.user,
                            obj_video_subscriptions=self.videoSubscriptions)

        resp_video_with_videosub = c.get(response_url, **self.headers)

        # video list include all videos because paid videosubscription
        video_list = [self.video1.id, self.video2.id, self.video3.id, self.video4.id]

        videos = Video.objects.filter(project_id=self.projects.id).annotate(
            video_url=Case(When(Q(id__in=video_list), then=F('url')), output_field=models.CharField()),
            paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()))

        # get data from db
        serializer_video = VideoListSerializer(video, many=True)
        serializer_video_with_videosub = VideoListSerializer(videos, many=True)

        # check one video
        self.assertEqual(response_video.data['results'][0]['paid'], True, msg='paid video must be True')
        self.assertEqual(response_video.data['results'], serializer_video.data)
        self.assertEqual(response_video.status_code, status.HTTP_200_OK)

        # check one videosubscription
        self.assertEqual(resp_video_with_videosub.data['results'][0]['paid'], True, msg='paid video must be True')
        self.assertEqual(resp_video_with_videosub.data['results'][1]['paid'], True, msg='paid video must be True')
        self.assertEqual(resp_video_with_videosub.data['results'][2]['paid'], True, msg='paid video must be True')
        self.assertEqual(resp_video_with_videosub.data['results'][3]['paid'], True, msg='paid video must be True')
        self.assertEqual(resp_video_with_videosub.data['results'], serializer_video_with_videosub.data)
        self.assertEqual(resp_video_with_videosub.status_code, status.HTTP_200_OK)

    def test_get_detail_video_anonymous_user(self):
        c = Client()
        url = '/api/video/' + str(self.video1.id)
        video = Video.objects.filter(project_id=self.projects.id, id=self.video1.id).annotate(
                video_url=ExpressionWrapper(F('url'), output_field=models.CharField()),
                comments=Value(list(Comment.objects.filter(video_id=self.video1.id).values(
                    ).annotate(username=F('user_id__first_name'))), output_field=models.TextField()))

        # get API response
        response = c.get(url, **self.headers)

        # get data from db
        serializer = VideoDetailSerializer(video[0])
        self.assertEqual(response.data, serializer.data, msg='VideoDetailSerializer')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_video_authenticate_user(self):
        """ not paid video """

        c = Client()
        c.login(email='user@user.com', password=5)
        response_url = '/api/video/' + str(self.video1.id)

        url = [self.video1.url]

        video_list = []

        video = Video.objects.filter(project_id=self.projects.id, id=self.video1.id).annotate(
            video_url=Case(When(Q(id=self.video1.id), then=url), output_field=models.CharField()
                           ),
            paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()
                      ),
            comments=Value(list(Comment.objects.filter(video_id=self.video1.id).values(
                ).annotate(username=F('user_id__first_name'))), output_field=models.TextField()))

        # get API response
        response = c.get(response_url, **self.headers)

        # get data from db
        serializer = VideoDetailSerializer(video[0])
        self.assertEqual(response.data['paid'], False, msg='not paid video must be False')
        self.assertEqual(response.data, serializer.data, msg='VideoDetailSerializer authenticate_user not paid video')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail_video_paid(self):
        """ paid video """

        c = Client()
        c.login(email='user@user.com', password=5)

        self.add_paid_video(obj_project=self.projects, obj_video=self.video1, obj_user=self.user)

        response_url = '/api/video/' + str(self.video1.id)

        url = ['{']  # it is url when use  project without blob_name and video without file_name for google_cloud

        video_list = [self.video1.id, ]  # paid video

        video = Video.objects.filter(project_id=self.projects.id, id=self.video1.id).annotate(
            video_url=Case(When(Q(id=self.video1.id), then=url), output_field=models.CharField()
                           ),
            paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()
                      ),
            comments=Value(list(Comment.objects.filter(video_id=self.video1.id).values(
                ).annotate(username=F('user_id__first_name'))), output_field=models.TextField()))

        # get API response
        response = c.get(response_url, **self.headers)

        # get data from db
        serializer = VideoDetailSerializer(video[0])
        self.assertEqual(response.data['paid'], True, msg='paid video is True')
        self.assertEqual(response.data, serializer.data, msg='VideoDetailSerializer authenticate_user paid video')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_videoContent_list(self):
        """ get all paid video for authenticate user if buy one video
            and if not authenticate user return not permitted
        """

        c = Client()
        c.login(email='user@user.com', password=5)

        # add one video to videocontent
        self.add_paid_video(obj_project=self.projects, obj_video=self.video2, obj_user=self.user)

        response_url = '/api/video/content/list/'
        response = c.get(response_url, **self.headers)

        video_list = [self.video2.id, ]  # paid video

        video = Video.objects.filter(project_id=self.projects.id, id__in=video_list).annotate(
                video_url=Case(When(Q(id__in=video_list), then=F('url')), default=None, output_field=models.CharField()
                ), paid=Case(When(Q(id__in=video_list), then=True), default=False, output_field=models.BooleanField()))

        serializer = VideoListSerializer(video, many=True)

        self.assertEqual(response.data['results'][0]['paid'], True, msg='paid video must be True')
        self.assertEqual(response.data['results'], serializer.data,
                         msg='videocontent view - VideoListSerializer authenticate_user paid video id')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check authenticate user
        c.logout()
        response = c.get(response_url, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg='must be not permitted')

    def test_transactions_list(self):
        """ get all transactions """

        c = Client()
        c.login(email='user@user.com', password=5)

        # add one video to videocontent
        self.add_paid_video(obj_project=self.projects, obj_video=self.video3, obj_user=self.user)

        response_url = '/api/user/transactions/list/'
        response = c.get(response_url, **self.headers)

        transactions = Transactions.objects.filter(user_id=self.user.id)

        serializer = TransactionsDetailSerializer(transactions, many=True)

        self.assertEqual(response.data['results'], serializer.data,
                         msg='transactions list view - TransactionsDetailSerializer authenticate user')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check authenticate user
        c.logout()
        response = c.get(response_url, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg='must be not permitted')

    def test_video_subscriptions_list(self):
        """ get all video subscriptions """

        c = Client()
        c.login(email='user@user.com', password=5)

        # add one paid videoSubscriptions
        self.add_paid_video(obj_project=self.projects, obj_user=self.user,
                            obj_video_subscriptions=self.videoSubscriptions)

        VideoSubscriptions.objects.create(
            name='VideoSubscriptions 2', description='VideoSubscriptions 2',
            duration='00:00:30', price=25.00, project_id=self.projects
        )

        response_url = '/api/video/subscription/'
        response = c.get(response_url, **self.headers)

        subscriptions_paid_id = [self.videoSubscriptions.id]  # list paid VideoSubscriptions

        video_subscriptions = VideoSubscriptions.objects.filter(project_id=self.projects.id).annotate(
                data_end=Case(When(Q(id__in=subscriptions_paid_id), then=Max('videocontent__data_end')),
                              default=None, output_field=models.DateField()),
                paid=Case(When(Q(id__in=subscriptions_paid_id), then=True),
                          default=False, output_field=models.BooleanField())).distinct()

        serializer = VideoSubscriptionListSerializer(video_subscriptions, many=True)

        self.assertEqual(response.data['results'][0]['paid'], True, msg='paid video must be True')
        self.assertEqual(response.data['results'][1]['paid'], False, msg='not paid video must be False')
        self.assertEqual(response.data['results'], serializer.data, msg='video subscriptions view')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check video subscriptions view for anonymous_user

        c.logout()
        response = c.get(response_url, **self.headers)

        video_subscriptions = VideoSubscriptions.objects.filter(project_id=self.projects.id)
        serializer = VideoSubscriptionListSerializer(video_subscriptions, many=True)

        self.assertEqual(response.data['results'], serializer.data, msg='video subscriptions view for anonymous_user')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_update_profile_custom_url(self):

        c = Client()
        c.login(email='user@user.com', password=5)
        # self.headers['HTTP_Content-type'] = 'application/json'
        response_url = '/api/user/' + str(self.user.id)

        update_data = {
            'first_name': 'SuperUser'
        }

        response = c.patch(response_url, content_type='application/json', data=update_data, **self.headers)

        update_user = get_user_model().objects.get(id=self.user.id)

        serializer = CustomUserDetailsSerializer(update_user)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], update_data['first_name'])
        self.assertEqual(response.data, serializer.data)

    def test_user_update_profile_default_url(self):

        c = Client()
        c.login(email='user@user.com', password=5)
        # self.headers['HTTP_Content-type'] = 'application/json'
        response_url = '/api-auth/user/'

        update_data = {
            'first_name': 'SuperUser'
        }

        response = c.patch(response_url, content_type='application/json', data=update_data, **self.headers)

        update_user = get_user_model().objects.get(id=self.user.id)

        serializer = CustomUserDetailsSerializer(update_user)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], update_data['first_name'])
        self.assertEqual(response.data, serializer.data)

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
