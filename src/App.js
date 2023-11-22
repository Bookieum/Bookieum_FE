import Header from "./components/Header";
import Footer from "./pages/Footer/Footer";
import styled from "styled-components";
import Signup from './components/Signup'
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login'
import MyPage from './components/Mypage'
import Question from './components/Question'
import MainFunc from './components/MainFunc'
import Kakao_auth from './components/Kakao_Auth'
import Naver_auth from './components/Naver_Auth'
import Google_auth from './components/Google_Auth'

import login2home from './components/Login2Home'
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import React from "react";

const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });



  return (
    <AllWrapper>
      <ContentWrapper>
        <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path='/kakao/oauth' element={<Kakao_auth/>}/>
            <Route path='/naver/oauth' element={<Naver_auth/>}/>
            <Route path='/google/oauth' element={<Google_auth/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/question" element={<Question/>}/>
            {/* <Route path='/kakao/oauth/login2home' element={<login2home/>}/> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/MainFunc" element={<MainFunc />} />
          </Routes>
      </ContentWrapper>
      <Footer />
    </AllWrapper>
  );
}

export default App;
