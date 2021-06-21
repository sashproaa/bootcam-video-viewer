# Generated by Django 2.2.16 on 2021-06-21 13:16
import time
from django.db import migrations


def link_duration(apps, shema_editor):
    Videosubscriptions = apps.get_model('easyviewer', 'Videosubscriptions')
    for suds in Videosubscriptions.objects.all():
        duration = suds.duration
        mins = time.strptime(str(duration), "%H:%M:%S")
        suds.period_month = mins.tm_min
        suds.save()


class Migration(migrations.Migration):

    dependencies = [
        ('easyviewer', '0007_auto_20210612_1828'),
    ]

    operations = [
        migrations.RunPython(link_duration),
    ]
