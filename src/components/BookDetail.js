import {React, useState} from 'react';
import '../css/home.css';
import styled from "styled-components";
import { useResolvedPath } from 'react-router-dom';

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
const BookDetail = () => {
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
        setBookImg(res.data.cover);
        setBookName(res.data.title);
        setBookAuthor(res.data.author);
        setBookPublisher(res.data.publisher);
        setBookPubDate(res.data.pub_date);
        setTotalPages(res.data.page_num);
        setBookCategory(res.data.category_name);
        setBookDescription(res.data.description);
        setDiary(res.data.diary);
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