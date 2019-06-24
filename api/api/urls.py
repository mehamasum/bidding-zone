from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from bidding import views
from rest_framework.authtoken import views as drf_views


router = routers.DefaultRouter()
router.register(r'api/users', views.UserViewSet)
router.register(r'api/groups', views.GroupViewSet)
router.register(r'api/auctinables', views.AuctionableViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/login/', drf_views.obtain_auth_token),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
