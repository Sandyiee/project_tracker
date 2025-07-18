from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
import jwt

from .firebase_config import firebase_auth
from .models import Manager, Client, Project, TechTeam, Feedback
from .serializers import (
    ManagerSerializer, ClientSerializer, ProjectSerializer,
    TechTeamSerializer, FeedbackSerializer
)

# Firebase Login
class FirebaseLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            token = request.data.get('token')
            if not token:
                return JsonResponse({'error': 'Token is missing'}, status=400)

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
                secure=False,
                samesite='Lax',
            )
            return response

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=403)


# Username/Password Login
class UsernamePasswordLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
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
        return JsonResponse({'error': 'Invalid credentials'}, status=403)


class ManagerListCreateView(generics.ListCreateAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
    permission_classes = [permissions.IsAuthenticated]


class ManagerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

class ClientListCreateView(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated]


class ClientRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProjectRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

class TechTeamListCreateView(generics.ListCreateAPIView):
    queryset = TechTeam.objects.all()
    serializer_class = TechTeamSerializer
    permission_classes = [permissions.IsAuthenticated]


class TechTeamRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TechTeam.objects.all()
    serializer_class = TechTeamSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


class FeedbackListCreateView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]


class FeedbackRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
