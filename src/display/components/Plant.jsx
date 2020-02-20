import React from "react";
import axios from "axios";

function Plant(props) {
  const lastDate = props.lastWatered.slice(0, 10)
  const lastTime = props.lastWatered.slice(11, 19)
  // let someDate = lastDate.getDate();
  // console.log(someData)
  return (
    <div>
      <h3>Plant: {props.plantName.toUpperCase()}</h3>
      <h4>Watering Schedule: Every {props.waterSchedule} days</h4>
      <p>Last Watered: {lastDate} at {lastTime}</p>
      <p>Next Watering: {props.nextWatering}</p>
    </div>
  );
}

export default Plant;
