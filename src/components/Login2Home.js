// import React from "react";
// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { Route } from "react-router-dom";
// // import Spinner from "./Spinner";
// const OAuth2RedirectHandler = (props) => {
//     const dispatch = useDispatch();
//     // 인가코드
//     let code = new URL(window.location.href).searchParams.get("code");
//     React.useEffect(async () => {
//         await dispatch(userActions.kakaoLogin(code));
//     }, []);
//     return (
//         <Route path=
//     )
// };
// export default OAuth2RedirectHandler;