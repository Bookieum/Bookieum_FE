import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Naver_Login(props) {

  const NAVER_CLIENT_ID="smCljzCdxfjm9Zp4EBDC"
  const NAVER_REDIRECT_URI="http://localhost:3000/naver/oauth"
  const STATE="false"
  const NAVER_CLIENT_SECRET="BBU6eL7SkK"
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');
  //check
  console.log(code);

  const sendCode=async()=>{
    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/naver/oauth/',{
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
      console.log(res)
      window.localStorage.setItem("token", res.access_token);
      console.log('성공')
      window.location.replace('/')
    })
  }

  useEffect(() => {
    sendCode();

  }, []);

  return <div>로그인 진행중입니다..</div>

}

export default Naver_Login;