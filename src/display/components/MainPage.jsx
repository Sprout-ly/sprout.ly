import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './context/UserContext.jsx';

function MainPage(props) {
function handleClick() {
  fetch('/test')
  .then((response) => console.log(response))
  .catch((err) => console.log(err));
}

function fetchdata() {
  fetch("https://trefle.io/api/plant",
  {
    method: 'GET',
    mode: 'no-cors',
    headers:{
      "Authorization": 'Bearer VGlCWVFZUU5mTkJLc1BYWUFYQ3F2Zz09', 
    }, 
  })
    .then(response => {
      console.log(response)
      response.json()})
    .then(data => console.log(data));
}

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}


return (
  <div>
    <div class="g-signin2" data-onsuccess={onSignIn} data-theme="dark"></div>
    <button type='button' onClick={handleClick}>CLICK ME!</button>
    <button type='button' onClick={fetchdata}>CLICK ME TOOO</button>
  </div>
)};

export default MainPage;