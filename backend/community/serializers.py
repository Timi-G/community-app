from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .models import Group, Post

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        Token.objects.create(user=user)  # generate token
        return user

class GroupSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'creator', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    group_name = serializers.CharField(source='group.name', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'content', 'group', 'group_name', 'creator', 'created_at']