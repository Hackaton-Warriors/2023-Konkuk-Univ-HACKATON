#-*-coding: utf-8-*-
#-*-coding: cp949-*-
#-*-coding: EUC-KR-*-

from django.shortcuts import render

import sys
# sys.path.append('C:\\Users\\lee\\2023-Konkuk-Univ-HACKATON\\Server\\crawling')
from .last import link
from .koBART import model_
# from last import link  # 또는 필요한 다른 변수나 함수

# 그 외의 views.py 코드...



# Create your views here

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def check_string(request):
    data = request.data
    url = data.get('value')
    title, content = link(url)

    try:
    
        with open("./config/content.txt", "w") as f:
            f.write(title + "\n" + content)
    
    except:
        return Response(
            {
                "title" : "OOPS!",
                "content" : "기사에 컴퓨터가 읽을 수 없는 특수문자가 포함되었어요.\n \
                            아주 일부 뉴스에서 이런 오류가 생긴답니다 😢"
            }, status=status.HTTP_200_OK)

    short_content = model_(content)
    if len(short_content) == 0:
        return Response(
            {
                "title" : "OOPS!",
                "content" : "AI가 제대로 학습하지 못했어요.\n \
                            아주 일부 뉴스에서 이런 오류가 생긴답니다 😢"
            }, status=status.HTTP_200_OK)
    
        
    else:
        return Response(
            {
                "title" : title,
                "content" : short_content
            }, status=status.HTTP_200_OK)
    


    #last.py


