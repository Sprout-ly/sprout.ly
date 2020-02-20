import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './context/UserContext.jsx';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'



function MainPage(props) {

  let accesToke = JSON.stringify({ key: "value" });
  let profileTok = JSON.stringify({ another: "valuse" });
  const [googleData, setgoogleData] = useState({ access: accesToke, profile: profileTok });

  // useEffect(() => {
  //   axios.get('/authenticate', {
  //     headers: {
  //       tokenType: "Bearer",
  //       authorization : accesToke
  //     }
  //   })
  // }, [googleData]);

  function handleClick() {
    fetch('/test')
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }


  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.tokenId)
    accesToke = JSON.stringify(response.id_token)
    profileTok = JSON.stringify(response.profileObj)
    setgoogleData({ access: accesToke, profile: profileTok })
    axios.get('/authenticate', {
      headers: {
        tokenType: "Bearer",
        authorization : response.tokenId
      }
    })
  }


  return (
    <div>
      <GoogleLogin
        clientId="1071619533746-68g7lhv0h6b1urgto5rak8cpk0orj929.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <button type='button' onClick={handleClick}>CLICK ME!</button>
      <div>{googleData.profile}</div>
      <div>{googleData.access}</div>
    </div>
  )
};

export default MainPage;