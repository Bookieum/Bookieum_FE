import React from 'react';
import '../css/mypage.css';
import styled from "styled-components";
import cute from '../image/cute.png'
import icon1 from '../image/icon1.png'
import icon2 from '../image/icon2.png'
import icon3 from '../image/icon3.png'
import icon4 from '../image/icon4.png'
import profile0 from '../image/0_icon.png'
import profile1 from '../image/1_icon.png'
import profile2 from '../image/2_icon.png'
import profile3 from '../image/3_icon.png'


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
  const [readLevel, setreadLevel] = useState();
  const [profileImage, setProfileImage] = useState();
  const [gender, setGender] = useState();
  const [genre, setGenre] = useState();
  const [mood, setMood] = useState();
  const [interest, setInterest] = useState();
  const [isbn, setIsbn]=useState();



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
      console.log(res.data)
      setNickName(res.data.user_name);
      setreadLevel(res.data.reading_level);
      setGender(res.data.gender)
      setGenre(res.data.genre)
      setMood(res.data.mood)
      setInterest(res.data.interest)
      const profileImageSrc = getProfileImage(res.data.reading_level);
      setProfileImage(profileImageSrc);
      setIsbn(res.data.isbn)

      // nickName=res.data.fields.user_name
    })

    // function profileImg(){
    //   let img_src;
    //   for (var i=0; i<=5; i++){
    //     if(readLevel ==i){
    //       img_src='../image/'+i+'_icon.png'
    //     }
    //   }
    //   return img_src;
    // }

    const getProfileImage = (readLevel) => {
      // 여기에서 readLevel에 따라 다른 이미지 주소를 반환합니다.
      if (readLevel === 0) {
        return profile0;
      } else if (readLevel === 1) {
        return profile1;
      } else if (readLevel === 2) {
        return profile2;
      } else {
        return profile3;
      }
    };
    const saveIsbnId=()=>{
      window.localStorage.setItem("isbn_id",isbn)
    }

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
                    <img className="profile" src={profileImage} alt='react'></img>
                </span>
                <span className='userinfo'>
                    <ul className='info'>
                        {/* <li>userid: {user_id}</li> */}
                        <li>reding Level : {readLevel}</li>
                        <li>이름 : {nickName}</li>
                        <li>성별 : {gender} </li>
                        <li>선호 장르 : <br/> Genre : {genre} <br/>Mood : {mood} <br/> Interest: {interest}</li>
                    </ul>
                </span>
            </div>
        </div>
        <div className='themehead'>
            <img src={icon2} className='icon'></img>
            <p className='theme'>History</p>
        </div>
        <div className='mid'>
          <ul className='bookList'>
            <li><img src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788954692526.jpg"></img>
              <div>
                <a href="/bookDetail">
                  <span>소설</span>
                  <span>각각의 계절</span>
                </a>
                <span>"권여선, 문학동네</span>
              </div>
            </li>
          </ul>
        </div>

        {/* <div className='themehead'>
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
        </div> */}
    </AllWrapper>
   

  );
};

export default Mypage;