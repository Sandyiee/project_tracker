from django.contrib import admin

from .models import Manager,Client,Project,TechTeam,Feedback

admin.site.register(Manager)
admin.site.register(Client)
admin.site.register(Project)
admin.site.register(TechTeam)
admin.site.register(Feedback)
