from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin


class CustomUserManager(BaseUserManager):
    
    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address.')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create, save and return a new superuser."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField("Email", unique=True, max_length=255)
    username = models.CharField("User Name", unique=True, max_length=255, blank=True, null=True)
    firstName = models.CharField("First Name", max_length=100, blank=True, null=True)
    lastName = models.CharField("Last Name", max_length=100, blank=True, null=True)
    profile_image = models.FileField(upload_to='profile_image', blank=True, null=True)
    user_bio = models.TextField(blank=True, null=True)
    
    is_active = models.BooleanField('Active', default=True)
    is_staff = models.BooleanField('Staff', default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Users"