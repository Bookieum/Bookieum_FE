import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import "../css/recommend.css";

const AllWrapper = styled.div`
    display: block;
    flex-direction: column;
    margin: auto;
    height: auto;
    width: fit-content;
    text-align: center;
    margin-top: 30px;
    align-items: center;
`;


const Recommend = () => {
    const [recommendBooks, setRecommendBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const location = useLocation();
    const bookinfo = {...location.state}

    console.log(window.localStorage.getItem('recommend_id'))
    const sendRecommendId = () => {
        fetch(
            `http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/main/recommendation/result/?recommend_id=${window.localStorage.getItem('recommend_id')}`,
            {
                method: "GET",
            //     headers: {
            //         "Content-Type": "application/x-www-form-urlencoded",
            //     },
            //     body: `recommend_id=${bookinfo}`,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setRecommendBooks(data.books);
                console.log(data)

            })
            .catch((error) => console.error("Error:", error));
    };

    const handleBookSelect = (selectedBookId) => {
        // 이미 선택된 도서인지 확인
        if (selectedBooks.includes(selectedBookId)) {
            // 이미 선택된 도서면 제거
            setSelectedBooks(
                selectedBooks.filter((id) => id !== selectedBookId)
            );

            // 도서가 선택 해제되었으므로 버튼 스타일 변경
            document
                .querySelector(`.title-button[data-id="${selectedBookId}"]`)
                .classList.remove("clicked");
        } else {
            // 새로 선택된 도서면 추가
            setSelectedBooks([...selectedBooks, selectedBookId]);

            // 도서가 선택되었으므로 버튼 스타일 변경
            document
                .querySelector(`.title-button[data-id="${selectedBookId}"]`)
                .classList.add("clicked");
        }

        console.log("Selected Books:", selectedBooks);
    };

    const sendSelectBook = () => {
        fetch(
            "http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/main/recommendation/select/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify({
                    access_token: window.localStorage.getItem("token"),
                    select_list: selectedBooks,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                window.location.replace("/mypage")
            })
            .catch((error) => console.error("Error:", error));
        console.log("Send Books:", selectedBooks);
    };

    useEffect(() => {
        sendRecommendId();
    }, []);

    return (
        <AllWrapper>
            <div className="RecommendBookContainer">
                <h2 className="custom-h2">추천 도서 목록</h2>
                <p>책 커버 위의 줄거리를 확인하고 오늘의 감정 도서를 선택하세요!</p>

                <div className="CustomBookList">
                    {recommendBooks  && recommendBooks.map((book) => (
                        <div className="CustomBookItem" key={book.mybook_id}>
                            <div className="CustomBookImage">
                                <img src={book.cover} alt={book.title} />
                                <div className="description">
                                    {book.description}
                                </div>
                            </div>
                            <h3 className="custom-h2">{book.title}</h3>
                            <button
                                className="title-button"
                                onClick={() => handleBookSelect(book.mybook_id)}
                                data-id={book.mybook_id}
                            >
                                선택
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <button className="complete-button" onClick={sendSelectBook}>
                선택 완료
            </button>
        </AllWrapper>
    );
};

export default Recommend;