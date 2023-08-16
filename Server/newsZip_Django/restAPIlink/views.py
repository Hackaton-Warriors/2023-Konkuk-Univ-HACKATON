from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import StringModel
from .serializers import StringSerializer

class StringAPI(generics.CreateAPIView):
    queryset = StringModel.objects.all()
    serializer_class = StringSerializer