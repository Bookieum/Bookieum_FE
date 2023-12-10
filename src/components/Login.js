import React from 'react';
import '../css/Login.css';
import styled from "styled-components";
import naver from '../image/btnW_완성형.png';
import kakao from '../image/kakao.png';
import google from '../image/google.png';

const AllWrapper = styled.div`
  display:block;
  flex-direction: column;
//   background-color:gray;
  margin:auto;
  height: 100vh;
  width:fit-content;
  align-items:center;
`;
const Login = () => {
  //const REST_API_KEY = [REST_API_KEY];
  //const REDIRECT_URI = [REDIRECT_URI];
    //카카오 로그인
    const REST_API_KEY = "87fda8cc914e1e764023457a0c098552"
    const KAKAO_REDIRECT_URI = "http://bookieum-bucket.s3-website.ap-northeast-2.amazonaws.com/kakao/oauth"
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    // // 네이버 로그인
    const NAVER_CLINET_ID="smCljzCdxfjm9Zp4EBDC"
    const NAVER_REDIRECT_URI="http://localhost:3000/naver/oauth"
    // const NAVER_REDIRECT_URI="http://bookieum-bucket.s3-website.ap-northeast-2.amazonaws.com/naver/oauth"

    const STATE="false"
    const NAVER_AUTH_URL=`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLINET_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`

    //구글 로그인
    const GOOGLE_CLIENT_ID="874649425571-cd5hu54l1keu4udm8a0bpte5388cdph4.apps.googleusercontent.com"
    const GOOGLE_REDIRECT_URI="http://bookieum-bucket.s3-website.ap-northeast-2.amazonaws.com/google/oauth"
    const GOOGLE_AUTH_URL=`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`
    return (
        <AllWrapper>
            <h1>LOGIN</h1>
            <div className="btn_login">
                <span >
                    <a href={KAKAO_AUTH_URL}><img src={kakao} className='child'></img></a>
                </span>
                <span>
                    <a href={GOOGLE_AUTH_URL}>
                        <img src={google} className='child2'></img>
                        </a>
                </span>
                <span >
                    <a href={NAVER_AUTH_URL}>
                        <img  src={naver} className='child3'></img>
                    </a>
                </span>
            </div>
        </AllWrapper>
    );
};

export default Login;