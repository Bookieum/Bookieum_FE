import React from 'react';
import '../css/home.css';
import styled from "styled-components";
import { useEffect, useState, useRef, useCallback, useContext } from 'react';
// import '../css/question.css'
import '../css/mainfunc.css'
import Webcam from 'react-webcam';
import axios from 'axios';
import dayjs from 'dayjs';
import mimeType  from 'mime';
import { useNavigate } from 'react-router-dom';

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
const VideoRecorder = () => {
  const contentRef = useRef();
  const videoRef = useRef(null);
  const [content, setContent] = useState("");
  const mediaRecorder = useRef(null);
  const videoChunks = useRef([]);
  // const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
  // const formData = new FormData();
  const navigate = useNavigate();
    // const [book1, setBook1]=useState();
  // const [book2, setBook2]=useState();
  // const [book3, setBook3]=useState();
  const [recommendId, setRecommendId]=useState();
  // 텍스트 전달
  const [text,setText] = useState("");

  const textHandler = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };


//   //비디오 전달
  const getMediaPermission = useCallback(async () => {
    try {
      console.log("video start");
      const audioConstraints = { audio: true };
      const videoConstraints = {
        audio: false,
        video: true,
      };

      const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
      );
      const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
      );

      if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
      }

      // MediaRecorder 추가
      const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      const recorder = new MediaRecorder(combinedStream, {
          mimeType: 'video/webm',
      });

      recorder.ondataavailable = (e) => {
        if (typeof e.data === 'undefined') return;
        if (e.data.size === 0) return;
        videoChunks.current.push(e.data);
        console.log("video stop")
      };

      mediaRecorder.current = recorder;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const downloadVideo = () => {
    const videoBlob = new Blob(videoChunks.current, { type: mimeType });
    const videoUrl = URL.createObjectURL(videoBlob);
    const link = document.createElement('a');
    link.download = `My video - ${dayjs().format('YYYYMMDD')}.webm`;
    link.href = videoUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const sendHandler=(e)=>{
    e.preventDefault();
    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
    const formData = new FormData();
    formData.append("text",text)
    formData.append("video", videoBlob); 
    formData.append("access_token", window.localStorage.getItem('token')); 
    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/main/recommendation/',{
      method:'POST',
      hearders:{
        // 'Content-Type': 'multipart/form-data; application/json; charset=utf-8'
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:formData,
    
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      console.log('성공')
       setRecommendId(res.data.recommend_info.recommend_id);
       console.log(res.data.recommend_info.recommend_id);
        window.localStorage.setItem('recommend_id',res.data.recommend_info.recommend_id)
        handleRecommendBook();
    })
  }

  const handleRecommendBook=()=>{
    navigate('/recommend',{
      state:{
        recommend_id:`${recommendId}`
      },
    });
  };
  useEffect(() => {
    getMediaPermission();

  }, []);

  return (
    
    <AllWrapper>
      <div className='question'>
        <p>당신의 오늘 하루는 어땠나요?</p>
      </div>
      <form>
        <div>
          <section>
          <video ref={videoRef} autoPlay />
            {/* <Webcam
              width={'300px'}
              border-radius={'10px'}/> */}
            <textarea
              placeholder="오늘 하루를 솔직하게 적어주세요."
              type="text"
              name="diary"
              onChange={textHandler} />

          </section>
        </div>
        <div className='submitdiv'>
          <button class="submit" type='submit' onClick={sendHandler}>Submit</button>
          {/* <button class="submit" type='submit' onClick={sendVideo}>Video Submit</button> */}
        </div>
      </form>
      {/* <button onClick={() => mediaRecorder.current.start()}>Start Recording</button>
      <button onClick={() => mediaRecorder.current.stop()}>Stop Recording</button>
      <button onClick={downloadVideo}>Download</button> */}

    </AllWrapper>
  );
}
  
    
    
  
  export default VideoRecorder;