import React from 'react';
import '../css/home.css';
import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from 'react';
import '../css/mainfunc.css'
import dayjs from 'dayjs';
import mimeType  from 'mime';
import { useNavigate } from 'react-router-dom';

const AllWrapper = styled.div`
  display:block;
  flex-direction: column;
  margin:auto;
  height:auto;
  width:700px;
  text-align: center;
  align-items:center;
  margin-top:-30px;
}

`;
const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const videoChunks = useRef([]);
  const navigate = useNavigate();
  const [recommendId, setRecommendId]=useState();
  const [loading, setLoading] = useState(false); // 로딩 상태를 저장할 상태
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
          videoRef.current.src = URL.createObjectURL(videoStream);
          videoRef.current.play();
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


  const sendHandler = (e) => {
    e.preventDefault();
    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
    const formData = new FormData();
    formData.append("text", text);
    formData.append("video", videoBlob);
    formData.append("access_token", window.localStorage.getItem('token'));
    setLoading(true);

    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/main/recommendation/', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data; application/json; charset=utf-8' // 삭제
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log('성공');
        setRecommendId(res.data.recommend_info.recommend_id);
        console.log(res.data.recommend_info.recommend_id);
        window.localStorage.setItem('recommend_id', res.data.recommend_info.recommend_id);
        handleRecommendBook();
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        <p className='explane'>저희 <strong>북이음</strong>은 사용자분들의 하루를 더 풍요롭게 <br/>만들어드리기 위해 특별한 기능을 제공합니다. <br/>바로 <strong>화면을 녹화하여</strong> 사용자분들이 작성한 일기와 함께,<br/> 당신의 감정을 분석하고 그에 맞는 독서 추천을 제공합니다.</p>

        <p>당신의 오늘 하루는 어땠나요?</p>
      </div>
      <form>
        <div>
          
          <section>
          {/* <video ref={videoRef} autoPlay /> */}
            {/* <Webcam
              width={'300px'}
              border-radius={'10px'}/> */}
            <textarea
              placeholder="오늘 하루를 솔직하게 적어주세요. (최대 300자)"
              type="text"
              name="diary"
              onChange={textHandler} 
              maxLength={300}/>

          </section>
        </div>
        <div className='submitdiv'>
          <button class="submit" type='submit' onClick={sendHandler}>{loading ? '전송 중...' : 'Submit'}</button>
        </div>
      </form>

    </AllWrapper>
  );
}
  
    
    
  
  export default VideoRecorder;