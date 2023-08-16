from rest_framework import serializers
from .models import StringModel

class StringSerializer(serializers.ModelSerializer):
    class Meta:
        model = StringModel
        fields = ('id', 'value')