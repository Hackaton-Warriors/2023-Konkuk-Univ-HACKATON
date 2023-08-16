from django.shortcuts import render

# Create your views here

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def check_string(request):
    data = request.data
    if data.get('value') == "ABC":
        return Response("True", status=status.HTTP_200_OK)
    return Response("False", status=status.HTTP_200_OK)
