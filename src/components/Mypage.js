import React from 'react';
import '../css/mypage.css';
import styled from "styled-components";
import icon1 from '../image/icon1.png'
import icon2 from '../image/icon2.png'
import icon3 from '../image/icon3.png'
import icon4 from '../image/icon4.png'
import profile0 from '../image/0_icon.png'
import profile1 from '../image/1_icon.png'
import profile2 from '../image/2_icon.png'
import profile3 from '../image/3_icon.png'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [mybookId, setMybookId]=useState();
  const [bookData, setBookData]=useState([])
  const [readingNum, setReadingNum]=useState();
  const [needNum, setNeedNum]=useState();

  useEffect(() => {
    getProfile();
  }, []);

  const parseJsonArray = (data) => {
    try {
      // 문자열 내부의 작은따옴표를 큰따옴표로 바꾸고 JSON 배열로 파싱하여 반환
      const jsonArray = JSON.parse(data.replace(/'/g, '"'));
      return Array.isArray(jsonArray) ? jsonArray : [];
    } catch (error) {
      console.error('Error parsing JSON array:', error);
      return [];
    }
  };

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
      setNickName(res.data.user_name);
      setreadLevel(res.data.reading_level);
      setGender(res.data.gender)
      setReadingNum(res.data.reading_num);
      setNeedNum(res.data.need_num);
      const profileImageSrc = getProfileImage(res.data.reading_level);
      setProfileImage(profileImageSrc);
      setMybookId(res.history.mybook_id);
      // window.localStorage.setItem('mybook_id',res.data.recommend_info.mybook_id)

      const genreArray = parseJsonArray(res.data.genre);
      const moodArray = parseJsonArray(res.data.mood);
      const interestArray = parseJsonArray(res.data.interest);

      // 설정된 배열을 문자열로 변환하여 설정
      setGenre(genreArray.join(', '));
      setMood(moodArray.join(', '));
      setInterest(interestArray.join(', '));

      //history
      setBookData(res.history);
    })

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

  }
  const saveMybookId=(mybookId)=>{
    window.localStorage.setItem('mybook_id', mybookId)
  };
  // const sendBookDetail=()=>{

  // }
  return (
    <AllWrapper>
        <div>
            <div className='themehead'>
                <img src={icon1} className='icon'></img>
                <p className='theme'>User Infomation</p>
                {/* <a href=""><img src={icon4} className='modifyicon'></img></a> */}
            </div>
            <div className='head'>
                <span className='profileimg'>
                    {/* <img src={profileImage} style={{ width: '200px', height: '200px' }}></img> */}
                    <img className="profile" src={profileImage} alt='react'></img>
                </span>
                <span className='userinfo'>
                    <ul className='info'>
                        {/* <li>userid: {user_id}</li> */}
                        <li className='reading_Level'> {readLevel}</li>
                        <li className="이름"> {nickName}</li>
                        <li className='성별'> {gender} </li>
                        <li className='선호장르'> {genre},{mood},{interest}</li>
                        <li className='읽은권수'> {readingNum} 권</li>
                        <li className='필요권수'> * 다음 레벨까지 {needNum} 권이 필요합니다! *</li>

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
            {bookData.map((book, index) => (
              <li key={index}>
                <img src={book.cover} alt={`Book Cover ${index + 1}`} />
                <div>
                {/* Link 컴포넌트의 to 속성에 객체를 전달하여 상태를 함께 전달 */}
                <Link to={{ pathname: "/bookDetail", state: { mybook_id: book.mybook_id } }} onClick={() => saveMybookId(book.mybook_id)}>
                  <span>{book.title}</span>
                </Link>
              </div>
            </li>
          ))}
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