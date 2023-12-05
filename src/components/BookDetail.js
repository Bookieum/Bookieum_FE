import React from 'react';
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
const BookDetail = () => {
    return (  
        <AllWrapper>
            <div className='totalwrap'>
                <div className='bookimg'></div>
                <div className='bookdetail'></div>
            </div>
            <div className='diary'>

            </div>
            <img></img>
        </AllWrapper>


        
    );
};

export default BookDetail;