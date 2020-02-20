import React from "react";

function Plant(props) {

  return (
    <div>
      <h3>Plant: {props.plantName.toUpperCase()}</h3>
      <h4>Watering Schedule: Every {props.waterSchedule} days</h4>
    </div>
  );
}

export default Plant;
