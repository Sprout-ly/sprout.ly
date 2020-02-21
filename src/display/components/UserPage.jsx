import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/UserContext.jsx";
import axios from "axios";
import DisplayUserPlants from "./DisplayUserPlants.jsx";

function UserPage(props) {
  const [plantName, setPlantName] = useState("");
  const [waterSchedule, setWaterSchedule] = useState("");
  const [lastWatered, setLastWatered] = useState("");

  const [userPlants, setUserPlants] = useState([]);
  const [gotData, setGotData] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getPlants();
  }, [userPlants]);

  function getPlants() {
    if (gotData === false) {
      axios
        .get("/plants", {
          params: {
            user_id: user.u_id // grab user_id from context
          }
        })
        .then(res => {
          setGotData(true);
          setUserPlants(res.data);
        })
        .catch(err => console.log(err));
    } else {
      return;
    }
  }

  function timeParse(time) {
    let timeString = JSON.stringify(time)
    let date = timeString.slice(1, 11)
    let newTime = timeString.slice(12, 17)
    return date + " " + newTime + ":00";
  }

  function nextWater(time) {
    if (lastWatered !== null) {
      const dateformat = new Date(lastWatered);
      const nextwateringtime = timeParse(addDays(dateformat, Number(waterSchedule)))
      return nextwateringtime;
    } else {
      return;
    }
  }

  function addDays(date, days) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('/plants', {
      user_id: 1,
      plantname: plantName,
      waterschedule: Number(waterSchedule),
      lastwatered: lastWatered,
      nextwatering: nextWater(lastWatered)
    })
      .then(res => console.log('item added'))
      .catch(err => console.log('didnt post', err))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Plant Name:</label>
        <input
          id="plant-name"
          type="text"
          name="plantName"
          placeholder="Enter plant name..."
          onChange={event => {
            setPlantName(event.target.value);
          }}
        />
        <br></br>
        <label>Water Schedule (days):</label>
        <input
          id="water-schedule"
          type="number"
          min="0"
          name="waterSchedule"
          placeholder="how often by days..."
          onChange={event => setWaterSchedule(event.target.value)}
        />
        <br></br>
        <label>Last Watered:</label>
        <input
          id="last-watered"
          type="datetime-local"
          name="lastWatered"
          onChange={event => setLastWatered(event.target.value)}
        />
        <br></br>
        <input id="submit" type="submit" value="Add Plant"></input>
      </form>
      <DisplayUserPlants userPlants={userPlants} />
    </div>
  );
}

export default UserPage;
