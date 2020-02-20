import React from "react";
import Plant from "./Plant.jsx";

function DisplayPlants(props) {
  const plants = props.showPlants.map((plant, idx) => {
    return (<Plant
      key={idx}
      plantId={plant.plant_id}
      userId={plant.user_id}
      plantName={plant.plantname}
      waterSchedule={plant.waterschedule}
      lastWatered={plant.lastwatered}
      nextWatering={plant.nextwatering}
    />
  )});
  return <div>{plants}</div>;
}

export default DisplayPlants;
