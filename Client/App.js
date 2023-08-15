import React, { useState, useRef, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';


function HiddenSummary({ closeSummary, openQnA }) {
  return (
    <div className="hidden-summary">
      <div className="hidden-summary-content">
        <h2>Hidden summary Content</h2>
        <p>This is a hidden summary window that appears when you click on "News Summary".</p>
      </div>
      <button className="close-summary-button" onClick={closeSummary}>Close</button>
      <button className="QnA-button" onClick={openQnA}>AI QnA</button>
    </div>
  );
}

function HiddenRecent({ closeRecent, openQnA }) {
  return (
    <div className="hidden-recent">
      <div className="hidden-recent-content">
        <h2>Hidden recent Content</h2>
        <p>This is a hidden recent window that appears when you click on "Recent Summeries".</p>
      </div>
      <button className="close-recent-button" onClick={closeRecent}>Close</button>
      <button className="QnA-button" onClick={openQnA}>AI QnA</button>
    </div>
  );
}

function HiddenQnA({ closeQnA }) {
  return (
    <div className="hidden-QnA">
      <div className="hidden-QnA-content">
        <h2>Q&A with AI</h2>
        
        <div className="search-container">
          <input className="search-input" type="text" placeholder="Search in QnA..."/>
          <button className="search-button" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

  

function App() {
  const [hiddenSummaryVisible, setHiddenSummaryVisible] = useState(false);
  const [hiddenRecentVisible, setHiddenRecentVisible] = useState(false);
  const [hiddenQnAVisible, setHiddenQnAVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // 참조 변수
  const qnaRef = useRef(null);

  // useEffect
  useEffect(() => {
    if (hiddenQnAVisible) {
      const rect = qnaRef.current.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.pageYOffset,
        behavior: 'smooth'
      });
    }
  }, [hiddenQnAVisible]);

  // 이벤트 핸들러 함수들
  const openHiddenSummary = () => {
    setHiddenSummaryVisible(true);
    setHiddenRecentVisible(false);
  };

  const closeHiddenSummary = () => {
    setHiddenSummaryVisible(false);
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

  const openHiddenQnA = () => {
    setHiddenQnAVisible(true);
  };

  const closeHiddenQnA = () => {
    setHiddenQnAVisible(false);
  };
  const showLoginModal = () => {
    setShowLogin(true);
  };

  const hideLoginModal = () => {
    setShowLogin(false);
  };



  return (
    <div className="My02">
      <Router>
        <div className="top-bar">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={showLoginModal} className="login-btn">Log in</button>
            <button onClick={showLoginModal} className="signup-btn">Sign up</button>
        </div>

        <div className="content">
          {/* 나머지 부분은 그대로 유지됩니다. */}
          <h1 className="title">WHAT DO YOU WANT TO ZIP?</h1>
          <div className="search-container">
            <input className="search-input" type="text" placeholder="Copy and paste the link..." onKeyDown={handleSearchKeyDown}/>
            <button className="search-button" onClick={openHiddenSummary} type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </button>
          </div>
          <div className="menu-container">
            <span className="menu1" onClick={openHiddenSummary}>News Summary</span>
            <span className="menu2" onClick={openHiddenQnA}>QnA with AI</span>
            <span className="menu3" onClick={openHiddenRecent}>Recent Summaries</span>
            <span className="menu4">Settings</span>
          </div>
          <div className="foot-container">
            <img className="foot-logo" src="logo.png" alt="logo"></img>
            <div className="foot-content">
              <p className="slogun"> We summarize news articles for easy reading.
              <br></br>Quickly and efficiently 
              </p>
              <ul className="creator-list">
                <li>Created by</li>
                <li>건국대학교 김다연</li>
                <li>부산대학교 안준영</li>
                <li>건국대학교 이은찬</li>
                <li>건국대학교 임현성</li>
              </ul>
            </div>
          </div>
          {hiddenSummaryVisible && <HiddenSummary closeSummary={closeHiddenSummary} openQnA={openHiddenQnA} />}
          {hiddenRecentVisible && <HiddenRecent closeRecent={closeHiddenRecent} openQnA={openHiddenQnA} />}
        </div>
        
        <Routes>
          <Route path="/login" element={
            <div className="login-container">
              <Login />
            </div>
          } />
        </Routes>
        <div className="QnA-content" ref={qnaRef}>
          <HiddenQnA closeQnA={closeHiddenQnA} />
        </div>
        {showLogin && (
          <div className="login-screen"> 
            <img src="Searchs_006.png" alt="background" className="login-background-img" />
            <div className="login-modal">
              <div className="login-box">
              <div className="login-header">Log in</div>
                <div className="login-form">
                    <input type="text" placeholder="ID" className="login-input" />
                    <input type="password" placeholder="Password" className="login-input" />
                    <button onClick={hideLoginModal} className="submit-login">Submit</button>
                </div>
              </div>
            </div>
          </div>
  )}

      </div>
    </Router>
  </div>
);
  }
export default App;
