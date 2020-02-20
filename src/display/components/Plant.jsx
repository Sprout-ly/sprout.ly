import React from "react";
import axios from "axios";

function Plant(props) {
  // axios
  //   .get(
  //     `https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/${props.plantId}?token=VGlCWVFZUU5mTkJLc1BYWUFYQ3F2Zz09`
  //   )
  //   .then(res =>
  //     console.log(
  //       "plant detail props",
  //       res.data.main_species.growth.moisture_use
  //     )
  //   );
  // axios.get("/plants").then(res => console.log(res));
  return (
    <div>
      <h3>Plant Name: {props.plantName}</h3>
      <h4>Watering Schedule (hours): {props.waterSchedule}</h4>
      <p>Last Watered: {props.lastWatered}</p>
      <p>Next Watering: {props.nextWatering}</p>
    </div>
  );
}

export default Plant;
