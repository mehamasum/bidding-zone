from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Auctionable, AuctionableImage, Category, Bid
from django.db.models import Max


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')


class AuctionableImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionableImage
        fields = '__all__'
        read_only_fields = ('id', 'item')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class BidSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Bid
        fields = '__all__'


class AuctionableSerializer(serializers.ModelSerializer):

    images = AuctionableImageSerializer(many=True, read_only=True)
    category = CategorySerializer()
    current_bid = serializers.SerializerMethodField()

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

    def get_current_bid(self, obj):
        return Bid.objects.filter(item=obj).aggregate(Max('amount'))['amount__max']

    # TODO: write update method for handling images
    # https://www.django-rest-framework.org/api-guide/serializers/#writing-update-methods-for-nested-representations
