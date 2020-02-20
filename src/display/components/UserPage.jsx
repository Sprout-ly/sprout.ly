import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";
import axios from "axios";
import DisplayUserPlants from "./DisplayUserPlants.jsx";

function UserPage(props) {
  const [userPlants, setUserPlants] = useState([]);
  const [gotData, setGotData] = useState(false);
  const { user } = useContext(UserContext);

  function getPlants() {
    if (gotData === false) {
      axios
        .get("/plants", {
          params: {
            user_id: user.u_id // grab user_id from context
          }
        })
        // .then(res => console.log(res.data))
        .then(res => {
          setGotData(true)
          setUserPlants(res.data)
        })
        .catch(err => console.log(err));
    } else {
      return;
    }
  }

  useEffect(() => {
    getPlants();
  }, [userPlants]);

  return (
    <div>
      <DisplayUserPlants userPlants={userPlants} />
    </div>
  );
}

export default UserPage;
