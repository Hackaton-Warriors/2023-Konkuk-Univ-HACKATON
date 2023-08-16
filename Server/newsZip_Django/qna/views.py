from django.shortcuts import render
# from .qna import qna_
import openai

#-*-coding: utf-8-*-
#-*-coding: euc-kr-*-
from pathlib import Path
import openai, json, os
from django.core.exceptions import ImproperlyConfigured


BASE_DIR = Path(__file__).resolve().parent.parent
secret_file = os.path.join(BASE_DIR, 'qna\SECRET.json')

with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {0} enviroment variable".format(setting)
        raise ImproperlyConfigured(error_msg)


openai.api_key = get_secret("SECRET_KEY")

# from last import link  # 또는 필요한 다른 변수나 함수

# 그 외의 views.py 코드...
# Create your views here

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def qna(request):
    data = request.data
    question = data.get('value')

    test = open("./config/content.txt", "r")
    temp = test.readlines()
    temp.append(question)
    news_question = '\n'.join(temp)

    messages = []
    messages.append({"role":"user", "content" : news_question})

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=messages
    )

    answer = completion.choices[0].message.content
    
    return Response(
        {
            "answer" : answer
        }, status=status.HTTP_200_OK)
    


    #last.py