import React, { useState } from "react";

const Context = React.createContext({
  loading: false,
});

export const ContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const setIsLoading = () => {
    setLoading((pre) => {
      return !pre;
    });
  };
  return (
    <Context.Provider value={{ loading, setIsLoading }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
