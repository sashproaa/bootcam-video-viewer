from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as msg
from django.contrib.auth import get_user_model
from django.db import models
from multiselectfield import MultiSelectField
import jsonfield
from phonenumber_field.modelfields import PhoneNumberField
import datetime

# Create your models here.
GENRE_CHOICES = (
    ('VAUDEVILLE', 'Водевиль'),
    ('DRAMA', 'Драма'),
    ('COMEDY', 'Комедия'),
    ('MELODRAMA', 'Мелодрама'),
    ('MIME', 'Мим'),
    ('MYSTERY', 'Мистерия'),
    ('MONODRAMA', 'Монодрама'),
    ('MORALITY', 'Моралите'),
    ('MUSICAL', 'Мюзикл'),
    ('PARODY', 'Пародия'),
    ('PASTORAL', 'Пастораль'),
    ('SOTI', 'Соти'),
    ('TRAGEDY', 'Трагедия'),
    ('TRAGICOMEDY', 'Трагикомедия'),
    ('FARCE', 'Фарс'),
    ('Extravaganza', 'Феерия'),
)

STATUS_CHOICE = (
    ('AC', 'Active'),
    ('P', 'Payed'),
    ('US', 'Unsuccessful'),
)


GENDER_CHOICE = (
    ('M', 'Male'),
    ('F', 'Female'),
)


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """User model.(not Base)"""
    username = None
    email = models.EmailField(msg('email address'), unique=True)
    mobile = PhoneNumberField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICE, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['mobile', 'date_of_birth', 'gender',]
    objects = UserManager()


# class ProfileUser(models.Model):
#     """ User Profile model """
#     user_id = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
#     name = models.CharField(max_length=200, blank=True, null=True)
#     lastName = models.CharField(max_length=200, blank=True, null=True)
#     mobile = PhoneNumberField(blank=True, null=True)
#     date_of_birth = models.DateField(blank=True, null=True)
#     gender = models.CharField(choices=GENDER_CHOICE, null=True)


class ProjectSubscriptions(models.Model):
    """ Projects subscriptions model """
    name = models.CharField(max_length=200)
    description = models.TextField()
    disk_size = models.PositiveIntegerField()
    fee = models.FloatField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    duration = models.DurationField()  # days?


class Projects(models.Model):
    """ Projects model """
    hash = models.CharField(max_length=200)
    name = models.CharField(max_length=400)
    user_id = models.ManyToManyField(get_user_model(), through='AdminProject')
    subscription_id = models.ForeignKey(ProjectSubscriptions, on_delete=models.CASCADE)


class AdminProject(models.Model):
    """ Using admin in model """
    id_user = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, blank=True, null=True)
    id_project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    isAdmin = models.BooleanField()


class VideoSubscriptions(models.Model):
    """ Video subscriptions model """
    name = models.CharField(max_length=200)
    description = models.TextField()
    duration = models.DurationField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    project_id = models.ForeignKey(Projects, on_delete=models.CASCADE)


class Video(models.Model):
    """ Video model """
    title = models.CharField(max_length=200)
    description = models.TextField()
    meta = models.CharField(max_length=500)
    genre = MultiSelectField(choices=GENRE_CHOICES, max_choices=5)
    project_id = models.ForeignKey(Projects, on_delete=models.CASCADE)
    actors = models.CharField(max_length=400)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    created_at = models.DateField()
    duration = models.DurationField()
    image = models.ImageField(upload_to='uploads/image')            # where to upload, max_length?
    preview_video = models.FileField(upload_to='uploads/preview')   # where to upload, max_length?
    subscription = models.ForeignKey(VideoSubscriptions, on_delete=models.CASCADE)
    url = models.CharField(max_length=400)


class VideoContent(models.Model):
    """ Video content model """
    data_start = models.DateTimeField()
    data_end = models.DateTimeField()
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    video_id = models.ForeignKey(Video, on_delete=models.CASCADE)
    video_subscription = models.ForeignKey(VideoSubscriptions, on_delete=models.CASCADE)


class Transactions(models.Model):
    """ Transactions model """
    hash = models.CharField(max_length=200, unique=True, default='function')    # function to generate hash
    user_id = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    title = models.CharField(max_length=200)
    status = models.CharField(max_length=200, choices=STATUS_CHOICE, default='Active')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    project_id = models.ForeignKey(Projects, on_delete=models.PROTECT)
    json_description = jsonfield.JSONField()
    created_at = models.DateTimeField()
