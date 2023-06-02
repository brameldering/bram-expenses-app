import React, { useState, useEffect } from "react";

import ExpensesMain from "./components/Expenses/ExpensesMain";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import Message from "./components/UI/Message/Message";
import AuthContext from "./store/auth-context";

const App = () => {
  const [message, setMessage] = useState(); // {header: "", body: ""}
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogInInformation = localStorage.getItem("isLoggedIn");

    if (storedLogInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
  };

  // close handler for status message modal
  const handleMessageClose = () => {
    setMessage(undefined); // Clear message object so that the modal is not displayed
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}>
      <MainHeader />
      <main>
        {message && <Message onMessageClose={handleMessageClose} message={message} />}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <ExpensesMain />}
      </main>
    </AuthContext.Provider>
  );
};

export default App;
