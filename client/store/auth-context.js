import React, { useState } from "react";

const AuthContext = React.createContext({
  user: undefined,
  onLogIn: (e) => {},
  onSignUp: (e) => {},
});

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(undefined);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
