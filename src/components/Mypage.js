import React from 'react';
import '../css/mypage.css';
import styled from "styled-components";
import cute from '../image/cute.png'
import icon1 from '../image/icon1.png'
import icon2 from '../image/icon2.png'
import icon3 from '../image/icon3.png'
import icon4 from '../image/icon4.png'
import { useEffect, useState } from 'react';

const AllWrapper = styled.div`
  display:block;
  flex-direction: column;
  margin:auto;
  height:auto;
  width:fit-content;
  align-items:center;
}

`;

const Mypage = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [gender, setGender] = useState();


  useEffect(() => {
    getProfile();
  }, []);


  const getProfile=(code,isChecked)=>{
    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/mypage/information/',{
      method:'POST',
      hearders:{
        'Content-Type':'application/json; charset=utf-8'
      },
      body:JSON.stringify({
        access_token:window.localStorage.getItem('token')
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      const user_id=res.user_id
      const nickName=res.Name
    })
  }
  return (
    <AllWrapper>
        <div>
            <div className='themehead'>
                <img src={icon1} className='icon'></img>
                <p className='theme'>User Infomation</p>
                <a href=""><img src={icon4} className='modifyicon'></img></a>
            </div>
            <div className='head'>
                <span className='profileimg'>
                    {/* <img src={profileImage} style={{ width: '200px', height: '200px' }}></img> */}
                    <img src={profileImage} className="profile"></img>
                </span>
                <span className='userinfo'>
                    <ul className='info'>
                        <li>userid: {user_id}</li>
                        <li>독서 Level : 0</li>
                        <li>닉네임 : {nickName}</li>
                        <li>성별 :  {gender}</li>
                        <li>선호 장르 : 추리소설</li>
                    </ul>
                </span>
            </div>
        </div>
        <div className='themehead'>
            <img src={icon2} className='icon'></img>
            <p className='theme'>History</p>
        </div>
        <div className='mid'>
            <span>
                <h2 className='histday'>2023-10-31 00:44:41</h2>
            </span>
            <span className='userinfo'>
                <p>감정 측정 : 긍정(47%), 부정(19%), 평이(34%)</p>
                <br/>
                <p>Q. 오늘 당신의 하루는 어땠나요?</p>
                <p>A. 위로받고 싶은 하루였어요..</p>
                <br/>
                <p>Q. 오늘 가장 기억에 남는 일은 무엇인가요?</p>
                <p>A. 점심으로 먹은 돈가스가 너무 맛있었어요.</p>
            </span>
            <span>
                <h2 className='histday'>2023-09-31 00:44:41</h2>
            </span>
            <span>
                <h2 className='histday'>2023-08-31 00:44:41</h2>
            </span>
            <button>레포트 생성하기</button>
        </div>

        <div className='themehead'>
            <img src={icon3} className='icon'></img>
            <p className='theme'>Achievements</p>
        </div>
        <div className='fin'>
            <span className='userinfo'>
                <ul className='info'>
                    <li>12권의 도서를 추천 받았어요</li>
                    <li>현재 6권의 책을 읽고 있어요</li>
                    <li>2권의 책을 성공적으로 완독했어요</li>
                    <li>추천 도서를 친구에게 3회 공유했어요</li>
                    <p>계속해서 독서를 즐기며 지식의 세계로 더 깊이 파고들어보세요!</p>
                </ul>
            </span>
        </div>
    </AllWrapper>
   

  );
};

export default Mypage;