from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as userAdmin
from django.utils.translation import ugettext_lazy as msg
from .models import *

# Register your models here.
#admin.site.register(User, UserAdmin)
admin.site.register(ProjectSubscriptions)
admin.site.register(Projects)

admin.site.register(AdminProject)
admin.site.register(VideoSubscriptions)
admin.site.register(Video)
admin.site.register(VideoContent)
admin.site.register(Transactions)
#admin.site.register(ProfileUser)


@admin.register(USER)
class UserAdmin(userAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (msg('Personal info'), {'fields': ('first_name', 'last_name')}),
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

