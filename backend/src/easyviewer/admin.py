from django.contrib.admin import AdminSite
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as userAdmin
from django.utils.translation import ugettext_lazy as msg
from .models import *
from video import settings

# Register your models here.
#admin.site.register(User, UserAdmin)
AdminSite.site_header = msg(settings.ADMIN_SITE_HEADER)
AdminSite.site_title = msg(settings.ADMIN_SITE_TITLE)
admin.site.register(ProjectSubscriptions)
admin.site.register(Projects)

admin.site.register(AdminProject)
admin.site.register(VideoSubscriptions)
admin.site.register(Video)
admin.site.register(VideoContent)
admin.site.register(Transactions)
admin.site.register(Comment)



@admin.register(User)
class UserAdmin(userAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (msg('Personal info'), {'fields': ('first_name', 'last_name', 'mobile', 'date_of_birth', 'gender',
                                           'avatar')}),
        (msg('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (msg('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'mobile', 'date_of_birth', 'gender', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

