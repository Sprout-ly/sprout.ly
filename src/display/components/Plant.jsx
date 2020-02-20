import React from "react";
import axios from "axios";

function Plant(props) {
  return (
    <div>
      <h3>Plant Name: {props.plantName}</h3>
      <h4>Watering Schedule (days): {props.waterSchedule}</h4>
      <p>Last Watered: {props.lastWatered}</p>
      <p>Next Watering: {props.nextWatering}</p>
    </div>
  );
}

export default Plant;
