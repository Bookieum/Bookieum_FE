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
export default function Home(props){
// const Home = (props) => {
    const navigate = useNavigate();

    return (  
        <AllWrapper>
            <div>
                책 기록 전부 보여줌
            </div>

        </AllWrapper>     
    );
};

// export default Home;