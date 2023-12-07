import {React, useState, useNavigate}from 'react';
import { useLocation } from 'react-router-dom';
import '../css/home.css';
import styled from "styled-components";

const AllWrapper = styled.div`
  display:block;
  flex-direction: column;
  // background-color:gray;
  margin:auto;
  height:auto;
  width:fit-content;
  text-align: center;
  margin-top:130px;
  align-items:center;
//   animation: color-change-2x 2s linear infinite alternate both;
}

`;
const Recomemnd = () => {

    const [book1, setBook1]=useState();
    const [book2, setBook2]=useState();
    const [book3, setBook3]=useState();
    const [recommendId, setRecommendId]=useState();
    const [selectbooklist, setSelectbooklist]=useState([]);
    const location = useLocation();
    const bookinfo = {...location.state}
    const navigate = useNavigate();
    const sendRecommendId=()=>{
        // 메인 기능에서 
        fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/kakao/oauth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: {
            recommend_id:bookinfo,
          }
        })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
        
        })
        .catch(error => console.error('Error:', error));
      };


    // 서버에 선택한 책 리스트 전달
      const sendSelectBook=()=>{
        
        fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000//main/selectbook/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: {
            access_token:window.localStorage.getItem('token'),
            selectbook:selectbooklist
          }
        })
        .then(response => response.json())
        .then(data => {
          // console.log(data)
        
        })
        .catch(error => console.error('Error:', error));
      };

    return (  
        <AllWrapper>
        <div>
          <h2>책 목록</h2>
          <div>
            {books.map((book) => (
              <div key={book.mybook_id} onClick={() => handleBookSelect(book)}>
                <img src={book.cover} alt={book.title} />
                <p>{book.title}</p>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={sendSelectBook}>선택 완료</button>
        </AllWrapper>


        
    );
};

export default Recommend;