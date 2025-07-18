from django.urls import path
from .views import (
    FirebaseLoginView, UsernamePasswordLoginView,
    ManagerListCreateView, ManagerRetrieveUpdateDestroyView,
    ClientListCreateView, ClientRetrieveUpdateDestroyView,
    ProjectListCreateView, ProjectRetrieveUpdateDestroyView,
    TechTeamListCreateView, TechTeamRetrieveUpdateDestroyView,
    FeedbackListCreateView, FeedbackRetrieveUpdateDestroyView,
)

urlpatterns = [

    path('login/firebase/', FirebaseLoginView.as_view(), name='firebase-login'),
    path('login/', UsernamePasswordLoginView.as_view(), name='username-password-login'),

    path('managers/', ManagerListCreateView.as_view(), name='manager-list'),
    path('managers/<int:pk>/', ManagerRetrieveUpdateDestroyView.as_view(), name='manager-detail'),

    path('clients/', ClientListCreateView.as_view(), name='client-list'),
    path('clients/<int:pk>/', ClientRetrieveUpdateDestroyView.as_view(), name='client-detail'),

    path('projects/', ProjectListCreateView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='project-detail'),

    path('techteam/', TechTeamListCreateView.as_view(), name='techteam-list'),
    path('techteam/<int:pk>/', TechTeamRetrieveUpdateDestroyView.as_view(), name='techteam-detail'),

    path('feedback/', FeedbackListCreateView.as_view(), name='feedback-list'),
    path('feedback/<int:pk>/', FeedbackRetrieveUpdateDestroyView.as_view(), name='feedback-detail'),
]
