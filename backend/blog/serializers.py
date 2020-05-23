from rest_framework import serializers

from .models import Category, Post, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    comments = CommentSerializer(
        source='comment_set', many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'text', 'category', 'comments')
