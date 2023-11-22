import React from 'react';
import '../css/home.css';
import styled from "styled-components";
import { useEffect, useState, useRef } from 'react';
// import '../css/question.css'
import '../css/mainfunc.css'
import Webcam from 'react-webcam';

const AllWrapper = styled.div`
  display:block;
  flex-direction: column;
  margin:auto;
  height:auto;
//   width:fit-content;
  width:700px;
  text-align: center;
  align-items:center;
}

`;
function Diary(){
    const contentRef = useRef();
    const [content, setContent] = useState("");

    return (
      
      <AllWrapper>
          <div className='question'>
              <p>당신의 오늘 하루는 어땠나요?</p>
          </div>
          <div>
            <section>
            <Webcam
                width={'300px'}
                border-radius={'10px'}/>
            <textarea
                placeholder="오늘 하루를 솔직하게 적어주세요."
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)} />
            </section>
          </div>
          <div className='submitdiv'>
            <button class="submit">Submit</button>
          </div>
           {/* <video className='container' ref={videoRef}></video> */}

      </AllWrapper>
     
  
    );
  }
    
    
    
  
  export default Diary;