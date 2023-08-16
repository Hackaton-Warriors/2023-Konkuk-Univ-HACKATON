from django.test import TestCase

# Create your tests here.

from last import link
from koBART import model_

제목, 내용 = link("https://n.news.naver.com/mnews/article/001/0014135175?rc=N&ntype=RANKING")
print("이것은 제목입니다")
print(제목)


print("이것은 내용입니다")
print(내용)

print(model_(내용))
