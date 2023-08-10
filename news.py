from newspaper import Article
import requests

# 링크
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
url = input("링크를 입력하세요")
html = requests.get(url, headers=headers).text

article = Article(url, language='ko')
article.download()
article.parse()

# 기사 제목을 출력합니다.
print('기사 제목:')
print(article.title)
print('')

# 기사 내용을 출력합니다.
print('기사 내용:')
print(article.text)
