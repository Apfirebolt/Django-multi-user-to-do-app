from rest_framework import serializers
from accounts.models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        'no_active_account': 'No account exists with these credentials, check password and email'
    }

    def validate(self, attrs):
        data = super().validate(attrs)
        # Added username so frontend matches your login atom expectation
        data.update({'userData': {
            'email': self.user.email,
            'username': self.user.username,
            'id': self.user.id
        }})
        return data


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    access = serializers.SerializerMethodField()
    refresh = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'id', 'is_staff', 'password', 'access', 'refresh', 'user_bio')
    
    def get_refresh(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh)

    def get_access(self, user):
        refresh = RefreshToken.for_user(user)
        # Fixed trailing comma bug (removed comma)
        return str(refresh.access_token)

    def create(self, validated_data):
        # Use manager's create_user to safely hash passwords
        return CustomUser.objects.create_user(**validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    """Separate serializer for profile updates so password isn't required"""
    class Meta:
        model = CustomUser
        fields = ('username', 'firstName', 'lastName', 'user_bio', 'profile_image')


class ListCustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'is_staff', 'user_bio',)