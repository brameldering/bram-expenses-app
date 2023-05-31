import React, { useState, useEffect } from "react";
import axios from "axios";

import NewExpense from "./NewExpense/NewExpense";
import Expenses from "./ExpensesList/Expenses";
import ViewEditExpense from "./ViewEditExpense/ViewEditExpense";

import Message from "../UI/Message/Message";
import CalculateNextId from "../Utils/CalculateNextId";
import { MESSAGE_TYPE } from "../UI/Message/MessageTypeClassName";

import classes from "./ExpensesMain.module.css";

const initExpenses = [{ id: 0, date: new Date(), title: "", amount: 0 }];

const ExpensesMain = () => {
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
        type: MESSAGE_TYPE.ERROR,
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
            type: MESSAGE_TYPE.ERROR,
            header: `Add New Expense`,
            body: `Error adding expense "${newExpense.title}", response.status: ${response.status}.`,
          });
        } else {
          console.log("setaddNewExpenseMessage: Expense added successfully.");
          setMessage({
            type: MESSAGE_TYPE.INFO,
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
    <div className={classes.main}>
      {message && <Message onMessageClose={handleMessageClose} message={message} />}

      {viewEditModalOpen && (
        <ViewEditExpense
          statusModalOpen={viewEditModalOpen}
          onViewEditExpenseClose={handleViewEditModalClose}
          editExpenseId={editExpenseId}
        />
      )}

      <NewExpense onAddExpense={addExpenseHandler} />

      <Expenses items={expenses} onViewEditApp={viewEditHandler} />
    </div>
  );
};

export default ExpensesMain;
