from django.shortcuts import render


# from last import link  # 또는 필요한 다른 변수나 함수

# 그 외의 views.py 코드...
# Create your views here

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def qna(request):
    data = request.data
    url = data.get('value')
    title, content = link(url)
    
    short_content = model_(content)
    return Response(
        {
            "title" : title,
            "content" : short_content
        }, status=status.HTTP_200_OK)
    


    #last.py