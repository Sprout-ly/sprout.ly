import React from "react";

function Plant(props) {

  return (
    <div>
      <br />
      <br />
      <h3>{props.plantName.toUpperCase()}</h3>
      <h4>Water every {props.waterSchedule} days</h4>

    </div>
  );
}

export default Plant;
