import React, { useState, useEffect } from "react";

import ExpensesMain from "./components/Expenses/ExpensesMain";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import Message from "./components/UI/Message/Message";

const App = () => {
  const [message, setMessage] = useState(); // {header: "", body: ""}
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  // close handler for status message modal
  const handleMessageClose = () => {
    setMessage(undefined); // Clear message object so that the modal is not displayed
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <ExpensesMain onLogout={logoutHandler} />}
        {message && <Message onMessageClose={handleMessageClose} message={message} />}
      </main>
    </React.Fragment>
  );
};

export default App;
