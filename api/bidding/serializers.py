from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Auctionable, AuctionableImage, Category


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class AuctionableImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionableImage
        fields = '__all__'
        read_only_fields = ('id', 'item')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class AuctionableSerializer(serializers.ModelSerializer):

    images = AuctionableImageSerializer(many=True, read_only=True)

    class Meta:
        model = Auctionable
        fields = '__all__'
        read_only_fields = ('id', 'user', 'added',)

    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        item = Auctionable.objects.create(**validated_data)
        for image_data in images_data.values():
            serializer = AuctionableImageSerializer(data={
                'image': image_data
            })
            if serializer.is_valid():
                serializer.save(item=item)
        return item

    # TODO: write update method for handling images
    # https://www.django-rest-framework.org/api-guide/serializers/#writing-update-methods-for-nested-representations
