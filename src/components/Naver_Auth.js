import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
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
      console.log('성공')
      // window.location.replace('/question')
    })
  }
  // const getToken = async () => {
  //   const payload = qs.stringify({
  //     grant_type: 'authorization_code',
  //     client_id: NAVER_CLIENT_ID,
  //     redirect_uri: NAVER_REDIRECT_URI,
  //     code: code,
  //     client_secret: NAVER_CLIENT_SECRET,
  //     "Access-Control-Allow-Origin": "https:localhost:3000/",
  //     // withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
  //   });
  //   try {
  //     const res = await axios({
  //       method:"GET",
  //       url:`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=${STATE}`
  //     })
  //     window.localStorage.setItem("token", res.data.access_token);
  //     console.log('받아온것 ', res);
  //     // console.log('진짜 토큰', window.localStorage.getItem('token'))
  //     sendToken()
  //   } catch (err) {
  //     console.log(err);
  //     // navigate('/');
  //   }
  // };

  useEffect(() => {
    sendCode();

  }, []);

}

export default Naver_Login;