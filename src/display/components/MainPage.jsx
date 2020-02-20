import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";
import { GoogleLogin } from "react-google-login";
import { render } from "react-dom";
import axios from "axios";
import DisplayPlants from "./DisplayPlants.jsx";
import regeneratorRuntime from "regenerator-runtime";




function MainPage(props) {

  const { user, updateUser } = useContext(UserContext);

  const [searchText, setSearchText] = useState("");
  const [showPlants, setShowPlants] = useState([]);

  // search bar fetching to backend
  function fetchPlants(event) {
    event.preventDefault();
    axios
      .get("/landing", {
        params: {
          plantName: searchText
        }
      })
      .then(res => setShowPlants(res.data))
      .catch(err => console.log(err));
  }

  async function getUserAuth(dataIn) {
    try {
      const userConfirm = await axios.get('/authenticate', {
        headers: {
          tokentype: "Bearer",
          authorization: dataIn.tokenId
        }
      });
      updateUser({
        name: userConfirm.data.name,
        u_id: userConfirm.data.u_id,
        email: userConfirm.data.email,
      })
      console.log(userConfirm)
      props.history.push("/userpage")
    } catch (error) {
      console.error(error);
    }
  }

  const responseGoogle = response => {
    getUserAuth(response);
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
