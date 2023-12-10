import React from 'react';
import '../css/home.css';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';


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

const Container = styled.span`
  display: flex;
  flex-direction: column;
`;
export default function Home(props){
// const Home = (props) => {
    const navigate = useNavigate();

    return (  
        <AllWrapper>
            <div>
                <p>감정과 컨텐츠를 이어드립니다.<br/>
                슬픔에서 행복으로 이주하세요.<br/>
                행복은 그대로 이어줄게요.</p>
            </div>
            {
                props.login
                ?
                (
                    <Container>
                    <button class='btn btn-5'>
                      <a href="/question" className='start'>
                        설문하기
                      </a>
                    </button>
                    <button class='btn btn-5'>
                      <a href="/mainfunc" className='start'>
                        추천받기
                      </a>
                    </button>
                  </Container>
                )
                :
                (
                <span>
                    <button class='btn btn-5'><a href="/login" className='start'>시작하기</a></button>
                </span>
            )
          }

        </AllWrapper>     
    );
};

// export default Home;