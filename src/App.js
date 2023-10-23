import Header from "./components/Header";
import Footer from "./pages/Footer/Footer";
import styled from "styled-components";
import Signup from './components/Signup'
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login'
import MyPage from './components/Mypage'
//import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import jwt_decode from "jwt-decode";
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
            <Route path="/signup" element={<Signup/>}/>

            {/* <Route path="/mypage" element={<Google_Auth/>} /> */}
            {/* <Route path="/mypage" element={<Kakao_Auth />} /> */}
            {/* <Route path="/mypage" element={<Naver_Auth />} /> */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
      </ContentWrapper>
      <Footer />
    </AllWrapper>
  );
}

export default App;
