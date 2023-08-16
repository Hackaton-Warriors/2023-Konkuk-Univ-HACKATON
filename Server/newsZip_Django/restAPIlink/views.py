from django.shortcuts import render
from crawling import last

# Create your views here

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def check_string(request):
    data = request.data
    url = data.get('value')

    #last.py


