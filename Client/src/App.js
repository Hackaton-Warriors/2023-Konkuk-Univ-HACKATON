import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const IMAGES = {
  BACKGROUND_1: 'sample_back1.png',
  BACKGROUND_2: 'sample_back2.png',
  BACKGROUND_3: 'sample_back3.png',
  BACKGROUND_4: 'sample_back4.png'
};

function HiddenSummary({ title, content, closeSummary }) {
  return (
    <div className="hidden-summary">
      <div className="hidden-summary-content">
        <p style={{fontSize:"36px", fontWeight:"bold", margin:"2% 0"}}>{title}</p>
        <p style={{fontSize:"22px", margin:"2% 0%"}}>{content}</p>
      </div>
      <button className="close-summary-button" onClick={closeSummary}>Close</button>
    </div>
  );
}

function HiddenRecent({ recentUrls, closeRecent }) {
  return (
    <div className="hidden-recent">
      <div className="hidden-recent-content">
        <p style={{padding:"1%", margin:"0.2%"}}>Recent Search Histories</p>
        <div className="recent-list">
          {recentUrls.slice(0).reverse().map((url, index) => (
            <a key={index} className="recent-item" target='_blank' href={url}>
              {url}
            </a>
          ))}
        </div>
      </div>
      <button className="close-recent-button" onClick={closeRecent}>Close</button>
    </div>
  );
}

function HiddenQnA({ closeQnA }) {
  const [question, setQuestion] = useState(''); // 1. 질문 상태 추가
  const [answer, setAnswer] = useState('Answer will appear here.'); // 응답 상태 추가

  // 2. 입력란에 텍스트를 입력할 때마다 상태를 업데이트
  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  // 3. 백엔드 서버로 질문을 보내고 응답을 받아오는 로직
  const fetchAnswer = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/qna/', { "value" : question });
      setAnswer(response.data.answer); // 서버에서 받아온 응답을 상태에 저장
    } catch (error) {
      console.error("Error fetching answer:", error);
      setAnswer("Error fetching answer.");
    }
  };

  const handleQnAKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchAnswer();
    }
  }; 
  return (
    <div className="hidden-QnA">
      <div className="hidden-QnA-content">
        <h2>Q&A with AI</h2>
        <div className="search-container">
          <input 
            className="search-input" 
            type="text" 
            placeholder="Search in QnA..." 
            value={question} 
            onChange={handleInputChange}
            onKeyDown={handleQnAKeyPress}
          />
          <button className="search-button" onClick={fetchAnswer} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </button>
        </div>
        <div className='answer-QnA'>
          <div style={{ fontWeight: 'bold', fontSize: '25px', padding: "10px 0px" }}>A:</div>{answer}</div>      
        </div>      
      <button className="close-summary-button" onClick={closeQnA}>Close</button>
    </div>
  );
}

function SettingsBox({ changeBackground, hideSettingsModal }) {
  return (
    <div className="settings-screen">
      <div className="settings-modal">
        <div className="settings-box">
          <p style={{fontSize:"60px", fontWeight:"bold", margin:"2%"}}>Settings</p>         
          <p style={{fontSize:"30px", margin:"1%"}}>Choose a background</p>
          <div className="bg-box">
            <button className="bg-btn" onClick={() => changeBackground(IMAGES.BACKGROUND_1)}>
                <img src={IMAGES.BACKGROUND_1} alt="bg1" />
            </button>
            <button className="bg-btn" onClick={() => changeBackground(IMAGES.BACKGROUND_2)}>
                <img src={IMAGES.BACKGROUND_2} alt="bg2" />
            </button>
            <button className="bg-btn" onClick={() => changeBackground(IMAGES.BACKGROUND_3)}>
                <img src={IMAGES.BACKGROUND_3} alt="bg3" />
            </button>
            <button className="bg-btn" onClick={() => changeBackground(IMAGES.BACKGROUND_4)}>
                <img src={IMAGES.BACKGROUND_4} alt="bg4" />
            </button>
            </div>
            <button className="close-settings" onClick={hideSettingsModal}>Close</button>
          </div>
      </div>
    </div>
  );
}

function App() {
  const [hiddenSummaryVisible, setHiddenSummaryVisible] = useState(false);
  const [hiddenQnAVisible, setHiddenQnAVisible] = useState(false);
  const [hiddenRecentVisible, setHiddenRecentVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hiddenUserInfoVisible, setHiddenUserInfoVisible] = useState(false);
  const [summaryTitle, setSummaryTitle] = useState('');
  const [summaryContent, setSummaryContent] = useState('');
  const [recentUrls, setRecentUrls] = useState([undefined, undefined, undefined, undefined, undefined]);
  const [backgroundImage, setBackgroundImage] = useState('sample_back4.png'); // 기본 배경 이미지
  const [showSettings, setShowSettings] = useState(false); // 설정 상자의 가시성
  // 이벤트 핸들러 함수들
  const openHiddenSummary = () => {
    setHiddenSummaryVisible(true);
    setHiddenRecentVisible(false);
  };

  const closeHiddenSummary = () => {
    setHiddenSummaryVisible(false);
  };

  const openHiddenQnA = () => {
    setHiddenQnAVisible(true);
  };

  const closeHiddenQnA = () => {
    setHiddenQnAVisible(false);
  };

  const openHiddenRecent = () => {
    setHiddenRecentVisible(true);
    setHiddenSummaryVisible(false);
  };

  const closeHiddenRecent = () => {
    setHiddenRecentVisible(false);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      openHiddenSummary();
      const url = event.target.value;
      const updatedUrls = [...recentUrls, url];
      updatedUrls.shift();
      setRecentUrls(updatedUrls);
      handleSearch(url);
    }
  };

  const showLoginModal = () => {
    setShowLogin(true);
  };

  const hideLoginModal = () => {
    setShowLogin(false);
    setHiddenUserInfoVisible(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  }
  
  const scrollPageQnA = () => {
    window.scrollTo({
      top: window.innerHeight * 0.38,
      behavior: 'smooth'
    });
  };
  
  const handleSearch = async (link) => {
    openHiddenSummary();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/check_string/', { "value" : link });
      setSummaryTitle(response.data.title);
      setSummaryContent(response.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const scrollPageTop = () => {
    window.scrollTo({
      top: window.innerHeight * 0,
      behavior: 'smooth'
    });
  };

  const showSettingsModal = () => {
    setShowSettings(true);
  };
  
  const hideSettingsModal = () => {
    setShowSettings(false);
  };

  const changeBackground = (image) => {
    setBackgroundImage(image);
    hideSettingsModal();
  };


  return (
    
    <div className="My02" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="top-bar">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button style={{ visibility: isLoggedIn ? 'hidden' : 'visible' }} onClick={showLoginModal} className="login-btn">Login</button>
          <button style={{ visibility: isLoggedIn ? 'hidden' : 'visible' }} onClick={showLoginModal} className="signup-btn">Sign up</button>
        </div>
      </div>
      <div className="content">
        <h1 className="title">WHAT DO YOU WANT TO ZIP?</h1>
        <div className="search-container">
          <input className="search-input" type="text" placeholder="Copy and paste the link..." onKeyDown={handleSearchKeyDown} />
          <button className="search-button"
            onClick={(event) => {
              const clickEvent = event; // 클릭 이벤트를 저장하는 변수
              openHiddenSummary();
              const url = document.querySelector(".search-input").value;
              const updatedUrls = [...recentUrls, url];
              updatedUrls.shift();
              setRecentUrls(updatedUrls);
              handleSearch(url);
            }}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </button>
        </div>
        <div className="menu-container">
          <span className="menu1" onClick={() => {openHiddenSummary(); scrollPageTop();}}>News Summary</span>
          <span className="menu2" onClick={() => { openHiddenQnA(); scrollPageQnA();}}>QnA with AI</span>
          <span className="menu3" onClick={() => {openHiddenRecent(); scrollPageTop();}}>Search Histories</span>
          <span className="menu4" onClick={showSettingsModal}>Settings</span>

        </div>
        
        <div className="foot-container">
          <img className="foot-logo" src="logo.png" alt="logo"></img>
          <div className="foot-content">
            <p className="slogun">We summarize news articles for easy reading.<br />Quickly and efficiently</p>
            <ul className="creator-list">
              <li>Created by</li>
              <li>건국대학교 김다연</li>
              <li>부산대학교 안준영</li>
              <li>건국대학교 이은찬</li>
              <li>건국대학교 임현성</li>
            </ul>
          </div>
        </div>
        {hiddenSummaryVisible && <HiddenSummary title={summaryTitle} content={summaryContent} closeSummary={closeHiddenSummary} />}
        {hiddenQnAVisible && <HiddenQnA closeQnA={closeHiddenQnA} />}
        {hiddenRecentVisible && <HiddenRecent recentUrls={recentUrls} closeRecent={closeHiddenRecent} />}
        {showSettings && <SettingsBox changeBackground={changeBackground} hideSettingsModal={hideSettingsModal} />}
      </div>
      {showLogin && (
        <div className="login-screen">
          <div className="login-modal">
            <div className="login-box">
              <div className="login-header">Login</div>
              <div className="login-form">
                <input type="text" placeholder="ID" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button onClick={() => {
                  handleLogin();
                  hideLoginModal();
                }} className="submit-login">Submit</button>
                <button className="close-login" onClick={hideLoginModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;