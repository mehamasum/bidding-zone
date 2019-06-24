from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Auctionable


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class AuctionableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auctionable
        fields = '__all__'
        read_only_fields = ('id', 'user', 'added',)