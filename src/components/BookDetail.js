import {React, useState} from 'react';
import '../css/home.css';
import styled from "styled-components";
import { useResolvedPath } from 'react-router-dom';
import "../css/bookdetail.css";

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

const exdata={
    recommend_books: [
      {
          mybook_id: 83,
          isbn_id: "9788949108308",
          title: "오늘도 너를 사랑해",
          author: "이누이 사에코",
          publisher: "비룡소",
          pub_date: new Date(2023, 2, 10), // 수정된 부분
          category_name: "유아",
          cover: "https://image.aladin.co.kr/product/31312/82/coversum/8949108305_1.jpg",
          description:
              "2022년에 출간되자마자 일본 아마존 베스트셀러 1위, 출간 1년 만에 누적 판매 부수 22만부 돌파, 전 세계 7개국에서 출간된 『오늘도 너를 사랑해』가 출간되었다. 작은 숲속에 사는 동물들이 서로서로 전하는 말 속에서 격려와 응원 그리고 깊은 사랑의 메시지를 전하는 그림책이다.",
          page_num: 40,
      },
    ]
  };
const BookDetail = () => {
    const[ wantbook,setWantbook]=useState([
        exdata.recommend_books
    ]);
    const [bookIsbn, setBookIsbn] = useState();
    const [bookImg, setBookImg] = useState();
    const [bookName, setBookName] = useState();
    const [bookAuthor, setBookAuthor] = useState();
    const [bookPublisher, setBookPublisher] = useState();
    const [bookPubDate, setBookPubDate] = useState();
    const [totalPages, setTotalPages]=useState();
    const [bookCategory, setBookCategory]=useState();
    const [bookDescription, setBookDescription]=useState();
    const [diary, setDiary]=useState();

    const getBookDetail=()=>{
        fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/mypage/detail/',{
        method:'POST',
        hearders:{
            'Content-Type':'application/json; charset=utf-8'
        },
        body:JSON.stringify({
            access_token:window.localStorage.getItem('isbn_id')
        }),
        })
        .then(res=>res.json())
        .then(res=>{
        console.log(res.data)
        setBookIsbn(res.data.isbn_id);
        // setBookImg(res.data.cover);
        // setBookName(res.data.title);
        setBookAuthor(res.data.author);
        setBookPublisher(res.data.publisher);
        setBookPubDate(res.data.pub_date);
        setTotalPages(res.data.page_num);
        setBookCategory(res.data.category_name);
        setBookDescription(res.data.description);
        setDiary(res.data.diary);
        setBookImg(wantbook.cover);

        setBookName(exdata.recommend_books.title);

        // nickName=res.data.fields.user_name
        })

    }
    return (  
        <AllWrapper>
            <div className='totalwrap'>
                <div className='bookimg'>
                    <img src={bookImg}></img>
                </div>
                <div className='bookdetail'>
                    {/* <ul>
                        <li>제목 : {bookName}</li>
                        <li>작가 : {bookAuthor}</li>
                        <li>출판사 : {bookPublisher}</li>
                        <li>출판 연도 : {bookPubDate}</li>
                        <li>줄거리 : {bookDescription}</li>
                        <li>카테고리 : {bookCategory}</li>
                        <li>총 페이지 수 : {totalPages}</li>
                    </ul> */}
                    <ul>
                        <li>제목 : {bookName}</li>
                        <li>작가 : {bookAuthor}</li>
                        <li>출판사 : {bookPublisher}</li>
                        <li>출판 연도 : {bookPubDate}</li>
                        <li>줄거리 : {bookDescription}</li>
                        <li>카테고리 : {bookCategory}</li>
                        <li>총 페이지 수 : {totalPages}</li>
                    </ul>
                </div>
            </div>
            <div className='diary'>
                <p>{diary}</p>
            </div>

        </AllWrapper>


        
    );
};

export default BookDetail;