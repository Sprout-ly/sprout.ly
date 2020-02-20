import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState({
    name: '',
    u_id: '',
    email: '',
  });

  // custom update function
  const updateUser = newUser => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
