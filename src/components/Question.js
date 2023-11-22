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



const MealChooseCard = () => {
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
    setCheckedItems([])
    setQues(ques+1)
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
        <button class="submit">Submit</button>
        :
        <button class="submit"  onClick={nextPage}>Next</button>
        }
      </div>
          
    </AllWrapper>
    
  );
};
export default MealChooseCard;





//백엔드 로그인 연동 성공시, 로그인 성공하면 바로 이 페이지 뜨도록 설정하자 
// function Question(){

//   const [question,setQuestion] = useState(['당신이 선호하는 장르는 어떤것인가요?','당신이 선호하는 분위기는 어떤것인가요?','당신이 선호하는 흥미 또는 관심사는 어떤것인가요?'])
//   let [ques, setQues] =useState(0)
//   let checkbtn=[['시대', '역사', '철학', '로맨스', '전쟁', '미스터리', '예술', '판타지',
//   '자서전', '동화', '과학', '무협'], ['고민', '열정', '도전', '긍정', '후회', '행복', '우울', '위로', '고통',
//   '자유', '희망', '슬픔', '열망', '비극', '불안', '용기', '절망', '불행', '유머', '힐링'],['리더십', '시간', '페미니즘', '취업', '진로', '비지니스', '설득', '건강',
//   '심리', '시', '희곡', '가족','관계', '동물', '사진', '그림', '여행',
//   '미술', '영화', '음악', '음식', '일기', '자연', '종교', '사랑', '인간',
//   '생각', '사회', '인생', '일상', '친구', '성공', '정치', '취미', '스포']]
// const [checkedList, setCheckedList] = useState<string[]>([]);
//   const [isChecked, setIsChecked] = useState(false);

//   const checkedItemHandler = (value: string, isChecked: boolean) => {
//     if (isChecked) {
//       setCheckedList((prev) => [...prev, value]);

//       return;
//     }

//     if (!isChecked && checkedList.includes(value)) {
//       setCheckedList(checkedList.filter((item) => item !== value));

//       return;
//     }

//     return;
//   };

//   const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
//     setIsChecked(!isChecked);
//     checkedItemHandler(value, e.target.checked);

//     console.log(value, e.target.checked);
//   };

//   const onSubmit = useCallback(
//     (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();

//       console.log('checkedList:', checkedList);
//     },
//     [checkedList]
//   );
// 출처: https://junheedot.tistory.com/11 [프론트엔드 개발자의 기억 저장소:티스토리]
//   function makebtn(ques){
//     let arr=[];
 
//     for(let j=0;j<checkbtn[ques].length;j++){
//       arr.push(
//         // <button className={isActive ? 'btn-hover color-3':''} onClick={handleClick}>{checkbtn[ques][j]}</button>
//         // <SortButton className={isActive ? 'btn-hover color-3':''} onClick={handleClick}>{checkbtn[ques][j]}</SortButton>
//         <input type='checkbox'>{checkbtn[ques][j]}</input>
//       )
//     }
    
//     return arr
//   }
//   return (
    
//     <AllWrapper>
      
//         <div className='question'>
//             <p>Q. {question[ques]}</p>
//         </div>
//         <div>
//             {makebtn(ques)}
//         </div>
//         <div className='submitdiv'>
//           {
//             ques===2?
//           <button class="submit">Submit</button>
//           :
//           <button class="submit"  onClick={ ()=> {setQues(ques+1)}}>Next</button>
//           }
//         </div>
          
//     </AllWrapper>
   

//   );
// }
  
  
  

// export default Question;