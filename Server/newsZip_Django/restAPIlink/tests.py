from django.test import TestCase

# Create your tests here.

from last import link

제목, 내용 = link("https://v.daum.net/v/20230816163252664")
print("이것은 제목입니다")
print(제목)


print("이것은 내용입니다")
print(내용)
