import React, { useState, useEffect } from "react";
import axios from "axios";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import ModalStatusMessage from "./components/UI/ModalStatusMessage";
import CalculateNextId from "./components/Utils/CalculateNextId";
import ModalViewEdit from "./components/UI/ModalViewEdit";

// const initExpenses = [
//   { id: 1, date: new Date(2023, 3, 31), title: "Insurance", amount: 1000 },
//   { id: 2, date: new Date(2023, 5, 1), title: "Birds", amount: 1232.82 },
// ];

const initExpenses = [{ id: 0, date: new Date(), title: "", amount: 0 }];

const App = () => {
  const [expenses, setExpenses] = useState(initExpenses);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [viewEditModalOpen, setViewEditModalOpen] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(0);
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
    setStatusModalOpen(false);
  };

  // close handler for view/edit modal
  const handleViewEditModalClose = () => {
    setViewEditModalOpen(false);
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
      // Display error message in Modal
      setStatusMessage(`Title, Amount, and Date are required and need to be valid.`);
      setStatusModalOpen(true);
    } else {
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
        setStatusModalOpen(true);
      });
    }
  };

  // ================================================================
  // Handle View/Edit Expense
  // ================================================================
  const viewEditHandler = (expenseId) => {
    console.log("viewEditHandler in App, id: " + expenseId);
    setEditExpenseId(expenseId);
    setViewEditModalOpen(true);
  };

  // ================================================================
  // TO DO Remove statusModelOpen from below
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />

      {statusModalOpen && (
        <ModalStatusMessage
          statusModalOpen={statusModalOpen}
          handleStatusModalClose={handleStatusModalClose}
          statusModalTitle='New Expense'
          statusModalMessage={statusMessage}
        />
      )}

      {viewEditModalOpen && (
        <ModalViewEdit
          statusModalOpen={viewEditModalOpen}
          handleStatusModalClose={handleViewEditModalClose}
          statusModalTitle='View/Edit Expense'
          editExpenseId={editExpenseId}
        />
      )}

      <Expenses items={expenses} onViewEditApp={viewEditHandler} />
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
