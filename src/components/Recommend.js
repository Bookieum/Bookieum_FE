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

// const exdata = {
//     recommend_info: { recommend_id: 207, pos_emotion: 70.0, neg_emotion: 30.0 },
//     recommend_books: [
//         {
//             mybook_id: 83,
//             isbn_id: "9788949108308",
//             title: "오늘도 너를 사랑해",
//             author: "이누이 사에코",
//             publisher: "비룡소",
//             pub_date: new Date(2023, 2, 10), // 수정된 부분
//             category_name: "유아",
//             cover: "https://image.aladin.co.kr/product/31312/82/coversum/8949108305_1.jpg",
//             description:
//                 "2022년에 출간되자마자 일본 아마존 베스트셀러 1위, 출간 1년 만에 누적 판매 부수 22만부 돌파, 전 세계 7개국에서 출간된 『오늘도 너를 사랑해』가 출간되었다. 작은 숲속에 사는 동물들이 서로서로 전하는 말 속에서 격려와 응원 그리고 깊은 사랑의 메시지를 전하는 그림책이다.",
//             page_num: 40,
//         },
//         {
//             mybook_id: 84,
//             isbn_id: "9791168030046",
//             title: "갯마을 차차차 1",
//             author: "신하은",
//             publisher: "북 로그컴퍼니",
//             pub_date: new Date(2021, 10, 8), // 수정된 부분
//             category_name: "예술/대중문화",
//             cover: "https://image.aladin.co.kr/product/28096/59/coversum/k702734346_1.jpg",
//             description:
//                 "코로 나 팬데믹 2년 차, 계속되는 사회적 거리두기로 인해 만나고 싶고 보고 싶은 이들과 강제 이별을 하며 '사람의 그리움'에 지쳐버린 우리들에게 아낌없는 웃음과 감동을 주며 많은 호평을 받은 드라마 '갯마을 차차차'의 대본집이 출간됐다.",
//             page_num: 480,
//         },
//         {
//             mybook_id: 85,
//             isbn_id: "9791168340855",
//             title: "내면소통",
//             author: "김주환",
//             publisher: "인플루엔셜(주)",
//             pub_date: new Date(2023, 1, 27), // 수정된 부분
//             category_name: "인문학",
//             cover: "https://image.aladin.co.kr/product/31189/93/coversum/s512831358_1.jpg",
//             description:
//                 "《회복탄력성》 출간 이래 한층 더 깊이 마음근력 연구에 집중해온 김주환 교수는 회복탄력성에서 한 단계 더 나아가 ‘내면소통’이 마음근력의 기초이며, 올바른 내면소통을 위한 최선의 방법은 명상이라는 사실을 신간 《내면소통》을 통해 전하고 있다.",
//             page_num: 768,
//         },
//     ],
// };

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
            <p>책 커버 위의 줄거리를 확인하고 오늘의 감정 도서를 선택하세요!</p>
            <button className="complete-button" onClick={sendSelectBook}>
                선택 완료
            </button>
        </AllWrapper>
    );
};

export default Recommend;