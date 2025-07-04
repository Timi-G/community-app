from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GroupViewSet, PostViewSet

router = DefaultRouter()
router.register(r'groups', GroupViewSet)
router.register(r'posts', PostViewSet)

urlpatterns = router.urls