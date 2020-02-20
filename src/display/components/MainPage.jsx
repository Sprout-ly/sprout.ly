import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";
import { GoogleLogin } from "react-google-login";
import { render } from "react-dom";
import axios from "axios";
import DisplayPlants from "./DisplayPlants.jsx";
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  Jumbotron,
  Row,
} from 'reactstrap';

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
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <div>{googleData.profile}</div>
      <div>{googleData.access}</div>
      <Jumbotron fluid>
        <Container fluid>
          <h1 className="display-3">Welcome to sprout.ly!</h1>
          <p className="lead">Lost that little card that came with your plant? Wondering how to water it?</p>
          <hr className="my-2" />
          <p>Enter your plant below, and we'll tell you!</p>
          <p className="lead"></p>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={fetchPlants}>
              <Input
                type="textarea"
                name="text"
                id="plantsubmit"
                onChange={event => setSearchText(event.target.value)}
              >
              </Input>
              <br />
              <Input color="primary" type="submit" value="What plant are you looking for?"></Input>
            </Form>
          </Col>
        </Row>
      </Container>
      <DisplayPlants showPlants={showPlants} />
    </div>
  );
}

export default MainPage;
