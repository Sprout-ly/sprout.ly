import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";
import { GoogleLogin } from "react-google-login";
import { render } from "react-dom";
import axios from "axios";
import DisplayPlants from "./DisplayPlants.jsx";

function MainPage(props) {
  let accesToke = JSON.stringify({ key: "value" });
  let profileTok = JSON.stringify({ another: "valuse" });
  const [googleData, setgoogleData] = useState({
    access: accesToke,
    profile: profileTok
  });

  const [searchText, setSearchText] = useState("");
  const [showPlants, setShowPlants] = useState([]);

  // search bar fetching to backend
  function fetchPlants() {
    event.preventDefault();
    console.log('searchtext', searchText)
    axios
      .get("/landing", {
        params: {
          plantName: searchText
        }
      })
      .then(res => {
        console.log('results', res);
        setShowPlants(res.data);
      })
      .catch(err => console.log(err));
  }

  const responseGoogle = response => {
    axios.get('/authenticate', {
      headers: {
        tokenType: "Bearer",
        authorization: response.tokenId
      }
    })
    console.log(response);
    accesToke = JSON.stringify(response.tokenObj);
    profileTok = JSON.stringify(response.profileObj);
    setgoogleData({ access: accesToke, profile: profileTok });
  };

  return (
    <div>
      <GoogleLogin
        clientId="1071619533746-68g7lhv0h6b1urgto5rak8cpk0orj929.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <div>{googleData.profile}</div>
      <div>{googleData.access}</div>
      <form onSubmit={fetchPlants}>
        <input
          type="text"
          placeholder="Enter Plant Name Here..."
          onChange={event => setSearchText(event.target.value)}
        ></input>
        <input type="submit" value="Search"></input>
      </form>
      <DisplayPlants showPlants={showPlants} />
    </div>
  );
}

export default MainPage;
