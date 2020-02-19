import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './context/UserContext.jsx';

function MainPage(props) {
function handleClick() {
  fetch('/test')
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
}

return (
  <div>
    <button type='button' onClick={handleClick}>CLICK ME!</button>
  </div>
)};

export default MainPage;