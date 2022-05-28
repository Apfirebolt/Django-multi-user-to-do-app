from rest_framework import serializers
from accounts.models import CustomUser
from tasks.models import Category, Task
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data 
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
        fields = ('username', 'email', 'id', 'is_staff', 'password', 'access', 'refresh',)
    
    def get_refresh(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh)

    def get_access(self, user):
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token),
        return access

    def create(self, validated_data):
        user = super(CustomUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class ListCustomUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'is_staff',)


class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ('id', 'category_image', 'name', 'description',)
        read_only_fields = ['created_by']


class TaskSerializer(serializers.ModelSerializer):

    category_name = serializers.SerializerMethodField('get_category_name')
    class Meta:
        model = Task
        fields = '__all__'

    def get_category_name(self, obj):
        return obj.category.name

