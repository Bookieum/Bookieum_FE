import React from 'react';
import '../css/home.css';
import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from 'react';
// import '../css/question.css'
import '../css/mainfunc.css'
import Webcam from 'react-webcam';
import axios from 'axios';
import dayjs from 'dayjs';
import mimeType  from 'mime';

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
  const [content, setContent] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoChunks = useRef<Blob>([]);
  const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
  const formData = new FormData();

  // 텍스트 전달
  const [text,setText] = useState("");

  const textHandler = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.
    console.log(text);
    let body = {
      email: text
    };
    axios
      .post('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/main/recommendation/', body)
      .then((res) => console.log(res));
  };

  //비디오 전달
  const getMediaPermission = useCallback(async () => {
    try {
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


  const sendVideo=()=>{
    const formData = new FormData();
    formData.append("video", mediaRecorder.current); 
    axios.post('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/main/recommendation/', formData, { // 요청
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
  }
  useEffect(() => {
    getMediaPermission();
  }, []);

  return (
    
    <AllWrapper>
      <div className='question'>
        <p>당신의 오늘 하루는 어땠나요?</p>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <section>
            <Webcam
              width={'300px'}
              border-radius={'10px'}/>
          <textarea
            placeholder="오늘 하루를 솔직하게 적어주세요."
            ref={contentRef}
            value={content}
            onChange={textHandler} />

          </section>
        </div>
        <div className='submitdiv'>
          <button class="submit" onClick={sendVideo}>Submit</button>
        </div>
      </form>
      <button onClick={() => mediaRecorder.current?.start()}>Start Recording</button>
      <button onClick={() => mediaRecorder.current?.stop()}>Stop Recording</button>
      <button onClick={downloadVideo}>Download</button>

    </AllWrapper>
  );
}
  
    
    
  
  export default VideoRecorder;