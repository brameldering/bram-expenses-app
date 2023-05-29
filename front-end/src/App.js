import React, { useState, useEffect } from "react";
import axios from "axios";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";
import Message from "./components/UI/Message/Message";
import CalculateNextId from "./components/Utils/CalculateNextId";
import ViewEditExpense from "./components/ViewEditExpense/ViewEditExpense";

const initExpenses = [{ id: 0, date: new Date(), title: "", amount: 0 }];

const App = () => {
  const [expenses, setExpenses] = useState(initExpenses);
  const [message, setMessage] = useState(); // {header: "", body: ""}
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
  const handleMessageClose = () => {
    setMessage(undefined); // Clear message object so that the modal is not displayed
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
      setMessage({
        header: `Add New Expense`,
        body: `Title, Amount, and Date are required and need to be valid.`,
      });
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
          setMessage({
            header: `Add New Expense`,
            body: `Error adding expense "${newExpense.title}", response.status: ${response.status}.`,
          });
        } else {
          console.log("setaddNewExpenseMessage: Expense added successfully.");
          setMessage({
            header: `Add New Expense`,
            body: `Expense "${newExpense.title}" added successfully.`,
          });
        }
        // Reload the expenses list from database
        setTriggerRefresh(!triggerRefresh);
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

      {viewEditModalOpen && (
        <ViewEditExpense
          statusModalOpen={viewEditModalOpen}
          onViewEditExpenseClose={handleViewEditModalClose}
          editExpenseId={editExpenseId}
        />
      )}

      {message && <Message onMessageClose={handleMessageClose} message={message} />}
      <Expenses items={expenses} onViewEditApp={viewEditHandler} />
    </div>
  );
};

export default App;
