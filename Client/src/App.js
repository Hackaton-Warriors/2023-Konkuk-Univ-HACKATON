import React, { useState, useRef, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';

function HiddenSummary({ title, content, closeSummary }) {
  return (
    <div className="hidden-summary">
      <div className="hidden-summary-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <button className="close-summary-button" onClick={closeSummary}>Close</button>
    </div>
  );
}

function HiddenQnA({ closeQnA }) {
  return (
    <div className="hidden-QnA">
      <div className="hidden-QnA-content">
        <h2>Q&A with AI</h2>
        <div className="search-container">
          <input className="search-input" type="text" placeholder="Search in QnA..." />
          <button className="search-button" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </button>
        </div>
        <div className='answer-QnA'>
          <div style={{ fontWeight: 'bold', fontSize: '25px', padding: "10px 0px" }}>A:</div>Answer is here.</div>
      </div>
      <button className="close-summary-button" onClick={closeQnA}>Close</button>
    </div>
  );
}

function HiddenRecent({ closeRecent }) {

  const recentItems = [
    { title: 'Example 1', url: 'https://www.example.com/1' },
    { title: 'Example 2', url: 'https://www.example.com/2' },
    { title: 'Example 3', url: 'https://www.example.com/3' },
    { title: 'Example 4', url: 'https://www.example.com/4' },
    { title: 'Example 5', url: 'https://www.example.com/5' },
  ];

  return (
    <div className="hidden-recent">
      <div className="hidden-recent-content">
        <p>Hidden recent Content</p>
        <div className="recent-list">
          {recentItems.map((item, index) => (
            <div key={index} className="recent-item">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}<br/>{item.url}
              </a>
            </div>
          ))}
        </div>
      </div>
      <button className="close-recent-button" onClick={closeRecent}>Close</button>
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
      top: window.innerHeight * 0.4, // 화면 높이의 30% 아래로 스크롤
      behavior: 'smooth'
    });
  };

  const handleSearch = async (link) => {
    try {
      const response = await axios.post('YOUR_BACKEND_ENDPOINT_HERE', { link });
      
      setSummaryTitle(response.data.title);
      setSummaryContent(response.data.content);
      
      openHiddenSummary();
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

  return (
    <div className="My02">
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
          <button className="search-button" onClick={() => handleSearch("127.0.0.1:8000/api/check_string/") } type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </button>
        </div>
        <div className="menu-container">
          <span className="menu1" onClick={() => {openHiddenSummary(); scrollPageTop();}}>News Summary</span>
          <span className="menu2" onClick={() => { openHiddenQnA(); scrollPageQnA();}}>QnA with AI</span>
          <span className="menu3" onClick={() => {openHiddenRecent(); scrollPageTop();}}>Recent Summaries</span>
          <span className="menu4">Settings</span>
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
        {hiddenRecentVisible && <HiddenRecent closeRecent={closeHiddenRecent} />}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;