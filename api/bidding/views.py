from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer, AuctionableSerializer
from .models import Auctionable
from .permissions import IsAuctionableOwner
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class AuctionableViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing auctionable items.
    """
    queryset = Auctionable.objects.all()
    serializer_class = AuctionableSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name',)

    def get_permissions(self):

        if (self.action == 'update' or self.action == 'partial_update' or
                self.action == 'destroy'):
            permission_classes = [IsAuctionableOwner]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

