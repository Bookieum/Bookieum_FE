import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Proptypes from 'prop-types';
import React, {useEffect,useState} from "react"
import axios from 'axios';

const Google = (props) => {
    const [ data, setData ] = useState(null);
    const GOOGLE_CLIENT_ID="874649425571-cd5hu54l1keu4udm8a0bpte5388cdph4.apps.googleusercontent.com"
    const GOOGLE_CLIENT_SECRET="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"
    const GOOGLE_REDIRECT_URI="http://localhost:3000/google/oauth"
    const oAuthURL = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${GOOGLE_CLIENT_ID}&
  response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=email profile&service=lso&o2v=2&theme=glif&flowName=GeneralOAuthFlow`;
    const oAuthHandler = () => {
      window.location.assign(oAuthURL);
    }
  
    useEffect( async () => {
      const url = new URL(window.location.href);
      const hash = url.hash;
      if (hash) {
        const accessToken = hash.split("=")[1].split("&")[0];
        await axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + accessToken, { 
          headers: { 
            authorization: `token ${accessToken}`, 
            accept: 'application/json' 
          }})
          .then(data => {
            console.log(data);
            setData(data);
        }).catch(e => console.log('oAuth token expired'));
      }
    }, [])
}
export default Google;