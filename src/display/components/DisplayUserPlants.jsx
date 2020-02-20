import React from "react";
import UserPlants from "./UserPlants.jsx";

function DisplayUserPlants(props) {
  const plants = props.userPlants.map((plant, idx) => {
    return (<UserPlants
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

export default DisplayUserPlants;
