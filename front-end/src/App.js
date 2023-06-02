import React, { useState, useContext } from "react";

import ExpensesMain from "./components/Expenses/ExpensesMain";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import Message from "./components/UI/Message/Message";
import AuthContext from "./store/auth-context";

const App = () => {
  const [message, setMessage] = useState(); // {header: "", body: ""}
  const context = useContext(AuthContext);

  // close handler for status message modal
  const handleMessageClose = () => {
    setMessage(undefined); // Clear message object so that the modal is not displayed
  };

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {message && <Message onMessageClose={handleMessageClose} message={message} />}
        {!context.isLoggedIn && <Login />}
        {context.isLoggedIn && <ExpensesMain />}
      </main>
    </React.Fragment>
  );
};

export default App;
