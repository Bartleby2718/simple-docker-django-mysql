from django.urls import path, include
from rest_framework.routers import DefaultRouter

from blog import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'comments', views.CommentViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('auth-token/', views.ObtainAuthToken.as_view()),
    path('', include(router.urls)),
]
