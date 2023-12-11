import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const updateUser = (users) => {
    setUsers((prev) => {
      return [...prev, { ...users }];
    });
    console.log(users, "users");
  };
  return (
    <Context.Provider value={{ users, updateUser }}>
      {children}
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>
);
