from rest_framework import serializers

from wishlist_backend.models import Wish


class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish
        fields = ['id', 'image', 'name', 'description']

