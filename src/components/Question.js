import React from 'react';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import '../css/question.css';
import QuestionButton from './QuestionChecked';

const AllWrapper = styled.div`
  display:block;
  flex-direction: column;
  margin:auto;
  height:auto;
  width:800px;
  align-items:center;
}
`;


const Survey = () => {
  const [checkedItems, setCheckedItems] = useState([])

  const [question,setQuestion] = useState(['당신이 선호하는 장르는 어떤것인가요?','당신이 선호하는 분위기는 어떤것인가요?','당신이 선호하는 흥미 또는 관심사는 어떤것인가요?'])
  let [ques, setQues] =useState(0)
  const checkbtn=[['시대','역사', '철학', '로맨스', '전쟁', '미스터리', '예술', '판타지',
  '자서전', '동화', '과학', '무협'], ['고민', '열정', '도전', '긍정', '후회', '행복', '우울', '위로', '고통',
  '자유', '희망', '슬픔', '열망', '비극', '불안', '용기', '절망', '불행', '유머', '힐링'],['리더십', '시간', '페미니즘', '취업', '진로', '비지니스', '설득', '건강',
  '심리', '시', '희곡', '가족','관계', '동물', '사진', '그림', '여행',
  '미술', '영화', '음악', '음식', '일기', '자연', '종교', '사랑', '인간',
  '생각', '사회', '인생', '일상', '친구', '성공', '정치', '취미', '스포츠']]

  const checkedItemHandler = (code, isChecked) => {
    if (isChecked) { //체크 추가할때
      setCheckedItems([...checkedItems, code])
    } 
    else if (!isChecked && checkedItems.find(one => one ===code)) {//체크 해제할때 checkedItems에 있을 경우
      const filter = checkedItems.filter(one => one !== code)
      setCheckedItems([...filter])
    }
  }
  const nextPage=(code,isChecked)=>{
    const isLastPage = ques === 1;
    console.log(isLastPage ? 'mood' : 'genre');

    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/survey/surveypage/',{
      method:'POST',
      hearders:{
        'Content-Type':'application/json; charset=utf-8'
      },
      body:JSON.stringify({
        access_token:window.localStorage.getItem('token'),
        type: isLastPage ? 'mood' : 'genre',
        survey:checkedItems
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      console.log('성공') 
    })
    console.log(checkedItems)
    setCheckedItems([])
    setQues(ques+1)
  }

  const submit=(code,isChecked)=>{
    fetch('http://ec2-13-124-237-120.ap-northeast-2.compute.amazonaws.com:8000/survey/surveypage/',{
      method:'POST',
      hearders:{
        'Content-Type':'application/json; charset=utf-8'
      },
      body:JSON.stringify({
        access_token:window.localStorage.getItem('token'),
        type: 'interest',
        survey:checkedItems
      }),
    })
    .then(res=>res.json())
    .then(res=>{
      console.log('성공')
    })
    console.log(checkedItems);
    window.location.replace('/mainfunc')
  }

  function makebtn(ques){
     let arr=[];
     for(let j=0;j<checkbtn[ques].length;j++){
      arr.push(
        checkbtn[ques][j]
       )}
     return arr
   }

  return (
    
    <AllWrapper>

      <div className='question'>
          <p>Q. {question[ques]}</p>
      </div>
      <div className='qestdiv'>
          {makebtn(ques).map(data=><QuestionButton data={data} checkedItems={checkedItems} checkedItemHandler={checkedItemHandler}/>)}      
      </div>
      <div className='submitdiv'>
        {
          ques===2?
        <button class="submit" onClick={submit} className="learn-more">Submit</button>
        :
        <button class="submit"  onClick={nextPage} className="learn-more">Next</button>
        }
      </div>
          
    </AllWrapper>
    
  );
};
export default Survey;