from rest_framework import serializers
from .models import Manager, Client, Project, TechTeam, Feedback
from django.contrib.auth.models import User

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TechTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechTeam
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

        
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # hides password from API response

    class Meta:
        model = User
        fields = ['username', 'password'] 

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user