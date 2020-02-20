import React from "react";

function UserPlants(props) {
  
  function normalizeTime (time) {
    let hours = time.slice(0, 2);
    const newTime = hours > 12 ? hours - 12 : hours;
    const amPm = hours > 12 ? 'PM' : 'AM';
    const adjustedTime = newTime + time.slice(2, 5) + ' ' + amPm;
    return adjustedTime;
  }

  function addDays(date, days) {
    return new Date(date.getTime() + days*24*60*60*1000)
  }

  function dateParser(date) {
    return date.toString().slice(0, 15);
  }

  function timeParser(time) {
    return time.toString().slice(16, 21)
  }

  const lastWateredDate = new Date(`${props.lastWatered}`);
  const nextWateredDate = addDays(lastWateredDate, props.waterSchedule);

  return (
    <div>
      <h2>Plant: {props.plantName.toUpperCase()}</h2>
      <h3>Watering Schedule: Every {props.waterSchedule} days</h3>
      <p>Last Watered: {dateParser(lastWateredDate)} at {normalizeTime(timeParser(lastWateredDate))}</p>
      <p>Next Watering: {dateParser(nextWateredDate)} at {normalizeTime(timeParser(nextWateredDate))}</p>
      <button>Sync</button>&emsp;
      <button>Edit</button>&emsp;
      <button>Delete</button>
    </div>
  );
}

export default UserPlants;
