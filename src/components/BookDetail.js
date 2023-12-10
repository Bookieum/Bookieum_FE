import {React, useEffect, useState} from 'react';
import '../css/home.css';
import styled from "styled-components";
import { useResolvedPath, useLocation } from 'react-router-dom';
import "../css/bookdetail.css";
import Swal from 'sweetalert2';

const AllWrapper = styled.div`
  display:block;
  flex-direction: column;
  // background-color:gray;
  margin:auto;
  height:auto;
  width:fit-content;
  text-align: center;
  margin-top:100px;
  align-items:center;
  border: 2px solid #ccc;
  font-family: 'Yeongdeok Blueroad';

//   animation: color-change-2x 2s linear infinite alternate both;
}

`;
const Divider = styled.div`
  width: 100%;
  border-top: 2px solid #ccc; /* 구분선의 색상과 두께를 조절할 수 있습니다. */
  margin: 20px 0; /* 구분선 위아래의 간격을 조절할 수 있습니다. */
`;


const BookDetail = () => {
    // const [bookIsbn, setBookIsbn] = useState();
    const [bookImg, setBookImg] = useState();
    const [bookName, setBookName] = useState();
    const [bookAuthor, setBookAuthor] = useState();
    const [bookPublisher, setBookPublisher] = useState();
    const [bookPubDate, setBookPubDate] = useState();
    const [totalPages, setTotalPages]=useState();
    const [bookCategory, setBookCategory]=useState();
    const [bookDescription, setBookDescription]=useState();
    const [bookcurpage, setBookCurpage]=useState();
    const [diary, setDiary]=useState();
    const [progressRate, setProgreaaRate]=useState();
    const [isEditing, setIsEditing] = useState(false); // 사용자가 편집 중인지 여부를 추적
    const [editedPage, setEditedPage] = useState('');

    const updatePageNumber = async () => {
        try {
          const response = await fetch(`http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/mypage/book/progress/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mybook_id: window.localStorage.getItem('mybook_id'),
              access_token: window.localStorage.getItem('token'),
              curr_page: editedPage,
            }),
          });
    
          const res = await response.json();
          console.log(res);
    
          // 페이지 업데이트 후 다시 데이터를 가져오도록 변경
          getBookDetail();
          Swal.fire('페이지 업데이트 성공!', '', 'success');
        } catch (error) {
          console.error('Error updating page number:', error);
          Swal.fire('페이지 업데이트 실패', '다시 시도해주세요.', 'error');
        }
      };

      const handlePageClick = () => {
        setIsEditing(true);
        setEditedPage(bookcurpage.toString());
      };
    
      const handlePageChange = (e) => {
        setEditedPage(e.target.value);
      };
    
      const handlePageBlur = () => {
        setIsEditing(false);
        updatePageNumber();
      };

    const getBookDetail = async () => {
        try {
          const response = await fetch(`http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/mypage/detail/?mybook=${window.localStorage.getItem('mybook_id')}`, {
            method: 'GET',
          });
          const res = await response.json();
          console.log(res)
          setBookName(res.book_info.title);
          setBookAuthor(res.book_info.author);
          setBookPublisher(res.book_info.publisher);
          const pubDate = res.book_info.pub_date.split('T')[0];
          setBookPubDate(pubDate);
          setTotalPages(res.book_info.page_num);
          setBookCategory(res.book_info.category_name);
          setBookDescription(res.book_info.description);
          setDiary(res.book_info.answer_content);
          setBookImg(res.book_info.cover);
          setBookCurpage(res.book_info.curr_page);
          setProgreaaRate(res.book_info.progress_rate);

        //   setBookName(exbook_info.recommend_books[0].title);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    useEffect(() => {
        getBookDetail();
      });
    return (  
        <AllWrapper>
            <div className='totalwrap'>
                <div className='bookimg'>
                    <img src={bookImg}></img>
                </div>
                <div className='bookdetail'>
                    <ul>
                        <li className='booktitle'> {bookName}</li>
                        <li><strong>작가  :</strong> {bookAuthor}</li>
                        <li><strong>출판사  :</strong> {bookPublisher}</li>
                        <li><strong>출판 연도  :</strong> {bookPubDate}</li>
                        <li><strong>카테고리  :</strong> {bookCategory}</li>
                        <li><strong>총 페이지 수  :</strong> {totalPages}</li>
                        {/* <li><strong>현재 페이지 수  :</strong> {bookcurpage}</li> */}
                         {/* 편집 중이면 입력 필드를 렌더링하고, 그렇지 않으면 페이지 번호를 렌더링합니다. */}
                        <li onClick={handlePageClick}>
                            <strong>현재 페이지 수 :</strong> {isEditing ? (
                                <input
                                type="text"
                                value={editedPage}
                                onChange={handlePageChange}
                                onBlur={handlePageBlur}
                                />
                            ) : (
                                <span>{bookcurpage}      <p className='currPage'>숫자를 누르면 수정 가능합니다!</p></span>
                            )}
                            </li>
                        <li><strong>진행률  :</strong> {progressRate} %</li>
                    </ul>
                </div>

            </div>
            <div className='description'>
                <li>{bookDescription}</li>
            </div>
            <div className='diary'>
                <h3>내가 쓴 일기</h3>
            <Divider />

                <p className='content'>{diary}</p>
            </div>

        </AllWrapper>


        
    );
};

export default BookDetail;