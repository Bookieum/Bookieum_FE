import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Proptypes from 'prop-types';
import React, {useEffect,useState} from "react"
import axios from 'axios';

const Google = (props) => {
    const [ data, setData ] = useState(null);
    const GOOGLE_CLIENT_ID="874649425571-cd5hu54l1keu4udm8a0bpte5388cdph4.apps.googleusercontent.com"
    const GOOGLE_CLIENT_SECRET="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"
    const GOOGLE_REDIRECT_URI="http://localhost:3000/google/oauth"
    const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${GOOGLE_CLIENT_ID}&
  response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email profile&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow`;
    const oAuthHandler = () => {
      window.location.assign(oAuthURL);
    }

    // 1) calllback으로 받은 인가코드
    const code = new URL(window.location.href).searchParams.get('code');
    // console.log(code);
    const googleLogin=()=>{
      // 2) 서버에 인가코드 전송
      fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `code=${code}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${GOOGLE_REDIRECT_URI}&grant_type=authorization_code&scope=email profile`,
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        const token = data.access_token;
        console.log('Access Token:', data.access_token);
        window.localStorage.setItem('token', data.access_token);

        // 3) 액세스 토큰 백엔드로 보내기
        fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/google/oauth/',{
        method:'POST',
        hearders:{
          'Content-Type':'application/json; charset=utf-8'
        },
        body:JSON.stringify({
          access_token:data.access_token
        }),
      })
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        console.log('성공')
        window.location.replace('/question')
      })
      })
      .catch(error => console.error('Error:', error));
    };
   
    useEffect(()=>{
      googleLogin();
    },[]);
  
}
export default Google;