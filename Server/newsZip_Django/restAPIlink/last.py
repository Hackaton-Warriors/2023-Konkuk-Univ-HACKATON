from newspaper import Article
import requests
from bs4 import BeautifulSoup
#권한을 얻기위한 헤더
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"}

# url = input()
url = ""
def link(url):
    if "news.naver.com" in url :                    #네이버 뉴스를 크롤링이 안됨으로 별도의 과정이 필요
        
        response = requests.get(url, headers = headers)

        html = response.content
        soup = BeautifulSoup(html, "html.parser")
        #print(soup)

        print("[제목]")
        target_element = soup.select_one('h2>span')  # h2 태그 아래의 span 태그 선택, 제목을 추출
        if target_element:
            text_content = target_element.get_text().strip()  # 제목을 추출함
            #return text_content

        articles = soup.select('article')           #기사 본문 내용을 추출

        print("\n[내용]\n")
        for article in articles:
            article_text = article.get_text().strip()  # 요소 내 텍스트 추출
            return text_content, article_text              #제목과 내용을 추출함

    else :
        html = requests.get(url, headers=headers).text          #naver기사가 아니라면 newspaper3k 패키지를 사용해 제목 기사 추출

        article = Article(url, language='ko')
        article.download()
        article.parse()

        # 기사 제목을 출력
        # print('기사 제목:')
        #text_content = article.title
        #return article.title
        

         #기사 내용을 출력
        #print('기사 내용:')

        article_text = article.text
        return article.title, article.text                  #제목과 내용을 추출함