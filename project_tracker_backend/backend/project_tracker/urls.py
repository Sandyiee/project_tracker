from django.urls import path
from .views import (
    FixedUserCreate,
    ManagerList, ManagerDetail,
    ClientList, ClientDetail,
    ProjectList, ProjectDetail,
    TechTeamList, TechTeamDetail,
    FeedbackList, FeedbackDetail,
    verify_firebase_token,username_password_login
)
urlpatterns = [
    path('register/', FixedUserCreate.as_view(), name='register'),
    path('verify-token/', verify_firebase_token, name='verify-firebase-token'),
    path('username-login/', username_password_login,name='username_password_login'),

    path('managers/', ManagerList.as_view(), name='manager-list'),
    path('managers/<int:pk>/', ManagerDetail.as_view(), name='manager-detail'),

    path('clients/', ClientList.as_view(), name='client-list'),
    path('clients/<int:pk>/', ClientDetail.as_view(), name='client-detail'),

    path('projects/', ProjectList.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetail.as_view(), name='project-detail'),

    path('techteam/', TechTeamList.as_view(), name='techteam-list'),
    path('techteam/<int:pk>/', TechTeamDetail.as_view(), name='techteam-detail'),

    path('feedback/', FeedbackList.as_view(), name='feedback-list'),
    path('feedback/<int:pk>/', FeedbackDetail.as_view(), name='feedback-detail'),
]
