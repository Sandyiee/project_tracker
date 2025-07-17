from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from django.contrib.auth import get_user_model, authenticate
from django.conf import settings
import jwt, json

from .models import Manager, Client, Project, TechTeam, Feedback
from .serializers import (
    ManagerSerializer, ClientSerializer, ProjectSerializer,
    TechTeamSerializer, FeedbackSerializer, UserSerializer
)

from .firebase_config import *
from firebase_admin import auth as firebase_auth

#  Login using Firebase Token
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def verify_firebase_token(request):
    try:
        body = json.loads(request.body)
        token = body.get('token')
        if not token:
            raise ValueError("Token is missing or empty")

        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token['uid']

        User = get_user_model()
        user, _ = User.objects.get_or_create(username=uid)

        jwt_token = jwt.encode({'user_id': user.id}, settings.SECRET_KEY, algorithm='HS256')

        response = JsonResponse({'message': 'Login successful'})
        response.set_cookie(
            key='access_token',
            value=jwt_token,
            httponly=True,
            secure=False,  # Set to True in production
            samesite='Lax',
        )
        return response
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=403)

#  Login with Username & Password
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def username_password_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        jwt_token = jwt.encode({'user_id': user.id}, settings.SECRET_KEY, algorithm='HS256')

        response = JsonResponse({'message': 'Login successful!'})
        response.set_cookie(
            key='access_token',
            value=jwt_token,
            httponly=True,
            secure=False,
            samesite='Lax',
        )
        return response
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=403)

#  CRUD 

class ManagerList(generics.ListCreateAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
    permission_classes = [IsAuthenticated]

class ManagerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
    permission_classes = [IsAuthenticated]

class ClientList(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class ClientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

class ProjectList(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

class TechTeamList(generics.ListCreateAPIView):
    queryset = TechTeam.objects.all()
    serializer_class = TechTeamSerializer
    permission_classes = [IsAuthenticated]

class TechTeamDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TechTeam.objects.all()
    serializer_class = TechTeamSerializer
    permission_classes = [IsAuthenticated]

class FeedbackList(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

class FeedbackDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]

#  Optional Registration Endpoint (if needed)
class FixedUserCreate(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
