from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import (UserSerializer, GroupSerializer,
                          AuctionableSerializer, CategorySerializer,
                          BidSerializer)
from .models import Auctionable, Category, Bid
from .permissions import IsAuctionableOwner
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class AuctionableViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing auctionable items.
    """
    queryset = Auctionable.objects.all()
    serializer_class = AuctionableSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('category', 'name',)

    def get_permissions(self):

        if (self.action == 'update' or self.action == 'partial_update' or
                self.action == 'destroy'):
            permission_classes = [IsAuctionableOwner]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True)
    def bids(self, request, pk=None):
        item = self.get_object()
        bids = Bid.objects.filter(item=item).order_by('-added')
        serializer = BidSerializer(bids, many=True)
        return Response(serializer.data)

