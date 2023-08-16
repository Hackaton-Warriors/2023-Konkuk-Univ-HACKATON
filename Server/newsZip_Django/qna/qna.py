#-*-coding: utf-8-*-
#-*-coding: euc-kr-*-
from pathlib import Path
import openai, json, os
from django.core.exceptions import ImproperlyConfigured


BASE_DIR = Path(__file__).resolve().parent.parent
secret_file = os.path.join(BASE_DIR, 'qna\SECRET.json')

with open(secret_file) as f:
    secrets = json.loads(f.read() )

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {0} enviroment variable".format(setting)
        raise ImproperlyConfigured(error_msg)


openai.api_key = get_secret("SECRET_KEY")

def qna_(question):

    messages = []

    newsletter = question
    new_str = []
    
    test = open("./config/content.txt", "r")
    temp = test.readlines()
    text = ' '.join(temp)           #text는 뉴스의 제목과 내용을 불러온 것이다. 만약 없다면? 그냥 GPT질문으로 만약 있다면 본문 + 질문으로

    if len(temp) <= 10:
        new_str = []
        new_str.append(newsletter)
        #new_str.append("\n\n 위 기사에 대해 질문을 할 거야. 위 기사에서 추측할 수 있는 부분에 대해서만, 묻는 질문에 답변을 해줘.")
        #newsletter = ''.join(new_str)
    else :
        new_str = text
        new_str.append("\n\n")
        new_str.append(newsletter)
    
    
        
    messages.append({"role":"user", "content" : new_str})

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=messages
    )

    chat_response = completion.choices[0].message.content
    print(f'ChatGPT: {chat_response}')
    messages.append({"role":"assistant", "content": chat_response})

    return chat_response