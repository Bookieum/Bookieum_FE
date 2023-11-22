import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';
import qs from 'qs';
const Kakao_Auth = () => {
  // const REST_API_KEY = [REST_API_KEY]
  // const REDIRECT_URI = [REDIRECT_URI]
  const REST_API_KEY = "87fda8cc914e1e764023457a0c098552"
  const KAKAO_REDIRECT_URI = "http://localhost:3000/kakao/oauth"
  const KAKAO_AUTH_URL=`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const CLIENT_SECRET='pLJ9Zb5Hv6LLrhxzLGZCKnO3X8yxiyIn'
  const navigate = useNavigate();

  // //calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get('code');
  //check
  console.log(code);

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
      withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
    
    });
    try {
      const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);
      window.Kakao.init(REST_API_KEY); // Kakao Javascript SDK 초기화
      window.Kakao.Auth.setAccessToken(res.data.access_token); // access token 설정
      window.localStorage.setItem("token", res.data.access_token);
      console.log('받아온것 ', res);
      console.log('진짜 토큰', res.data.access_token)

      // setIsLoggedIn(true);
      navigate('/profile');
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  };

  const sendToken=async()=>{
    // const token = window.localStorage.getItem('res.data.access_token');
    // console.log('access token',token)
    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/kakao/oauth',{
      method:'POST',
      hearders:{
        'Content-Type':'application/json; charset=utf-8'
      },
      body:JSON.stringify({
        code:code
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      console.log('성공')
      navigate('/profile')
    })
    // const data=qs.stringify({
    //   access_token:token
    // });
    // try {
    //   const res = await axios.post('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/kakao/oauth/', data);
    //   console.log('받아온것 ', res);

    // } catch (e) {
    //   console.error(e);
    // }
  };
  useEffect(() => {
    getToken();
    sendToken();
  }, []);

  return <div>로그인 진행중입니다..</div>

};


export default Kakao_Auth;
