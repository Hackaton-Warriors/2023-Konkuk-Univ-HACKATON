import requests
from bs4 import BeautifulSoup
import time



url = input("링크를 입력하세요")

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"}
response = requests.get(url, headers = headers)

html = response.content
soup = BeautifulSoup(html, "html.parser")
#print(soup)


print("[제목]\n")
target_element = soup.select_one('h2>span')  # h2 태그 아래의 span 태그 선택
if target_element:
    text_content = target_element.get_text().strip()  # 선택한 요소의 텍스트 추출
    print(text_content)



articles = soup.select('article')
print("\n[내용]\n")
for article in articles:
       article_text = article.get_text().strip()  # 요소 내 텍스트 추출
       print(article_text)

#articles = soup.select("div.info_group")

