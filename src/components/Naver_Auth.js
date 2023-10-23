import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  // const REST_API_KEY = [REST_API_KEY]
  // const REDIRECT_URI = [REDIRECT_URI]
  const NAVER_CLIENT_ID = "smCljzCdxfjm9Zp4EBDC"
  const NAVER_REDIRECT_URI = "http://localhost:3000/naver/oauth"
  const navigate = useNavigate();
  const { naver } = window;
  //calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get('code');

  //check
  console.log(code);

  useEffect(() => {
    let naverLogin = new window.naver.LoginWithNaverId({
      clientId: {NAVER_CLIENT_ID},
      callbackUrl: `http://localhost:3000/naver/oauth`,
      loginButton: { color: "green", type: 3, height: "50" },
    });
    naverLogin.init();
    naverLogin.logout();
    try {
      naverLogin.getLoginStatus((status) => {
        if (status) {
          console.log(naverLogin.user);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
};

export default Auth;