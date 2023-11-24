import styled from "styled-components";
import search_icon from "../image/ico_package.png";
import { Link } from "react-router-dom";
import { produceWithPatches } from "immer";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 24px;
  }
  font-size: 2rem;
  box-shadow: 0 10px 10px -15px rgba(0,0,0,0.50);
  a:visited { 
    text-decoration-line: none;
    color: black;
   }
   a:link { 
    color: black;
    text-decoration: none;
 }
`;
//로고이름
const Navbarlogo = styled.div`
  font-size:2.5rem;
  justify-content: space-between;
  color: black;
  i {
    color: orange;
  }
    /* 북이음 */

  // position: absolute;
  width: 188px;
  height: 69px;
  left: 67px;
  top: 9px;
  padding: 0 30px;
  font-family: 'Yeongdeok Blueroad';
  font-style: normal;
  font-weight: 400;
  font-size: 46px;
  line-height: 56px;

  color: #000000;


  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Navbarmenu = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  font-size: 16px;

  li {
    font-family: 'Yeongdeok Blueroad';
    font-style: normal;
    padding: 8px 12px;
    text-decoration-line: none;
    list-style-type:none;
    position:relative;
    display:inline-block;
    font-weight: bold;
    font-size:1.0625rem;
    text-decoration: none;
  }
  li:hover {
    background-color: #a5c9ca;
    text-decoration-line: none;
    list-style-type:none;
  }
  a:link { 
      color: black;
      text-decoration: none;
   }
    
   a:visited { 
    text-decoration: none;
    color: black;
   }
    
   a:hover { 
    text-decoration: underline;
    color: black;
   }
  @media only screen and (max-width: 576px) {
    //width: 100%;
    flex-direction: column;
    align-items: center;
    width: 100%;

    li {
      color: black;
      width: 100%;
      text-align: center;
      text-decoration: none;
    }
    a:link { 
      text-decoration: none;
      color: black;
     }
      
     a:visited { 
      text-decoration: none;
      color: black;
     }
      
     a:hover { 
      text-decoration: underline;
      color: black;
     }
`;

const Navbarlink = styled.div`
  @media only screen and (max-width: 768px) {
    margin: 0 auto;
  }
  > li {
    list-style: none;
    text-decoration-line: none;
    text-decoration: none;

  }
`;

const Searchbar=styled.div`
  position: relative;
  width: 300px;
  right:50px;
  align-items: center;
  input{
    width: 100%;
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
  }
  img {
    position : absolute;
    width: 17px;
    top: 11px;
    right: 0.3px;
    margin: 0;
    }
`;

const Menu=styled.div`
  display: flex;
  list-style: none;
  padding-left: 0;
  font-size: 16px;

  li {
    font-family: 'Yeongdeok Blueroad';
    font-style: normal;
    padding: 8px 12px;
    text-decoration-line: none;
    list-style-type:none;
    position:relative;
    display:inline-block;
    font-weight: bold;
    font-size:1.0625rem;
    text-decoration: none;
  }
  li:hover {
    background-color: #a5c9ca;
    text-decoration-line: none;
    list-style-type:none;
  }
  a:link { 
      color: black;
      text-decoration: none;
   }
    
   a:visited { 
    text-decoration: none;
    color: black;
   }
    
   a:hover { 
    text-decoration: underline;
    color: black;
   }
   
`;

export default function Header(props) {
  return (
    <>
      <Navbar>
        <Navbarlogo>
          {/* <img src={logo} alt="Logo" width="50" height="50" /> */}
          <a href='/'>북이음</a>
        </Navbarlogo>
        <Navbarmenu>
          <Searchbar>
              <input type="text" placeholder="검색어를 입력하세요."/>
              <img src={search_icon} alt="search_icon" />
          </Searchbar>
          {
            props.login
            ?
            (<Menu>
              <li><a href="/mainfunc">책 추천</a></li>
              <li><a href="/mypage">마이페이지</a></li>
              <li>로그아웃</li>
            </Menu>
            )
            :
            (<Menu>
              <li><a href="/login">로그인</a></li>
            </Menu>
            )
          }
        </Navbarmenu>
      </Navbar>
    </>
  );
}
