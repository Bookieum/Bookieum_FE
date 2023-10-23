import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import KaKaoLogin from 'react-kakao-login';

const Kakao_Auth = () => {
  // const REST_API_KEY = [REST_API_KEY]
  // const REDIRECT_URI = [REDIRECT_URI]
  const REST_API_KEY = "87fda8cc914e1e764023457a0c098552"
  const KAKAO_REDIRECT_URI = "http://localhost:3000/login/kakao/oauth"
  const KAKAO_AUTH_URL=`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const navigate = useNavigate();

  //calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get('code');

  //check
  console.log(code);

  useEffect(() => {

    const forToken = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: KAKAO_REDIRECT_URI,
      code: code,
    };

    const body = Object.keys(forToken)
      .map((k) => encodeURIComponent(k) + '=' + encodeURI(forToken[k]))
      .join('&');

    try {
      // access token 가져오기
      fetch("https://kauth.kakao.com/oauth/token", {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: body,
      })
        .then((res) => res.json())
        .then((res) => {
          //window.Kakao.init([JAVASCRIPT_KEY]);
          window.Kakao.init("76b0ba205f62779beb0c12f741cf9cfa");

          window.Kakao.Auth.setAccessToken(res.access_token);
          console.log('받아온것 ', res);
          navigate('/profile');
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
};

export default Kakao_Auth;
