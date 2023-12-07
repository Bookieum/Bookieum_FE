import Header from "./components/Header";
import Footer from "./pages/Footer/Footer";
import styled from "styled-components";
import Home from './components/Home';
import Login from './components/Login'
import MyPage from './components/Mypage'
import Question from './components/Question'
import MainFunc from './components/MainFunc'
import Kakao_auth from './components/Kakao_Auth'
import Naver_auth from './components/Naver_Auth'
import Google_auth from './components/Google_Auth'
import Logout from './components/Logout'
import BookDetail from "./components/BookDetail";
import { useEffect, useState } from "react";
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
  const [login, setLoginState]=useState(false);
  const storedUserLoggedIninfo=localStorage.getItem('token');
  useEffect(()=>{
    if(storedUserLoggedIninfo===null){
      console.log('로그인 실패')
    }
    else{
      setLoginState(true)
      console.log('로그인 성공')
    }
  })
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
        <Header login={login}/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path='/kakao/oauth' element={<Kakao_auth/>}/>
            <Route path='/naver/oauth' element={<Naver_auth/>}/>
            <Route path='/google/oauth' element={<Google_auth/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/question" element={<Question/>}/>
            <Route path="/mainFunc" element={<MainFunc />} />
            <Route path="/bookDetail" element={<BookDetail />} />
          </Routes>
      </ContentWrapper>
      <Footer />
    </AllWrapper>
  );
}

export default App;
