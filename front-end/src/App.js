import React, { useState, useEffect } from "react";
import axios from "axios";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import ModalStatusMessage from "./components/UI/ModalStatusMessage";
import CalculateNextId from "./components/Utils/CalculateNextId";

// const initExpenses = [
//   { id: 1, date: new Date(2023, 3, 31), title: "Insurance", amount: 1000 },
//   { id: 2, date: new Date(2023, 5, 1), title: "Birds", amount: 1232.82 },
// ];

const initExpenses = [{ id: 0, date: new Date(), title: "", amount: 0 }];

const App = () => {
  const [expenses, setExpenses] = useState(initExpenses);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusModelOpen, setStatusModelOpen] = React.useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  // ================================================================
  // Load Expenses from the database using axios API to server.js
  useEffect(() => {
    console.log("====================================");
    console.log("useEffect called");
    const loadExpenses = async () => {
      const response = await axios.get(`/api/expenses`);
      console.log("response.data");
      console.log(response.data);
      response.data.forEach((expense) => {
        expense.date = new Date(expense.date); // convert date string to Date object for each expense
      });
      setExpenses(response.data);
    };
    loadExpenses(); // this inner function is defined above and called here because useEffect cannot be async
  }, [triggerRefresh]);
  // ================================================================

  // close handler for status message modal
  const handleStatusModalClose = () => {
    setStatusModelOpen(false);
  };

  // ================================================================
  // Handle Add New Expense
  // ================================================================
  const addExpenseHandler = async (enteredExpenseData) => {
    console.log("====================================");
    console.log("addExpenseHandler called");
    console.log(enteredExpenseData);
    // test that input is valid
    const d = new Date(enteredExpenseData.date);
    if (
      !enteredExpenseData.title ||
      isNaN(enteredExpenseData.amount) ||
      !(d instanceof Date && !isNaN(d))
    ) {
      return;
    }
    // Calculate nextId and complete the newExpense object with id and dateAdded
    const nextId = CalculateNextId(expenses);
    const now = new Date();
    const newExpense = {
      ...enteredExpenseData,
      id: nextId,
      dateAdded: now,
      dateAddedOffset: now.getTimezoneOffset(),
    };

    // Add Expense to the database using axios API to server.js
    // TO DO create an synchronous call that waits for the database to be updated and wait for the error message if any
    console.log("AddExpenseHandler: Add Expense to the database");
    const response = await axios.post(`/api/expenses`, newExpense).then((response) => {
      console.log("response in AddExpenseHandler: ");
      console.log(response.status);
      // Check response.status and display status message
      if (response.status !== 200) {
        console.log("setaddNewExpenseMessage: Error: response.status !== 200.");
        setStatusMessage(
          `Error adding expense "${newExpense.title}", response.status: ${response.status}.`
        );
      } else {
        console.log("setaddNewExpenseMessage: Expense added successfully.");
        setStatusMessage(`Expense "${newExpense.title}" added successfully.`);
      }
      // Reload the expenses list from database
      setTriggerRefresh(!triggerRefresh);

      // Display status message in Modal
      setStatusModelOpen(true);
    });
  };

  // ================================================================
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />

      {statusModelOpen && (
        <ModalStatusMessage
          statusModelOpen={statusModelOpen}
          handleStatusModalClose={handleStatusModalClose}
          statusModalTitle='New Expense'
          statusModalMessage={statusMessage}
        />
      )}

      <Expenses items={expenses} />
    </div>
  );
  // ================================================================
  // Traditional React JavaScript
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Expense list React"),
  //   React.createElement(Expenses, { items: expenses }, "")
  // );
};

export default App;
