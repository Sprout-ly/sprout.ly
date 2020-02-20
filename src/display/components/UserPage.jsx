import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './context/UserContext.jsx';

function UserPage (props) {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.name}
      {user.u_id}
      {user.email}
    </div>
  )
}

export default UserPage;