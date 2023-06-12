import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import NewExpense from "./NewExpense/NewExpense";
import Expenses from "./ExpensesList/Expenses";
import ViewEditExpense from "./ViewEditExpense/ViewEditExpense";

import Message from "../UI/Message/Message";
import { MESSAGE_TYPE } from "../UI/Message/MessageTypeClassName";
import LoadingIndicator from "../UI/LoadingIndicator/LoadingIndicator";
import useHttp from "../../hooks/use-http";

import classes from "./ExpensesMain.module.css";

// TO DO: Define everything in TypeScript
// type ExpenseType = { id: number, date: Date, title: string, amount: number };
// let expense: ExpenseType = {id: 1, date: new Date(), title: "test", amount: 1.12};
// type ExpensesType = Array<ExpenseType>;  (let expenses: ExpensesType = [expense, expense2]; )

const ExpensesMain = () => {
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState(null); // {header: "", body: ""}
  const [viewEditModalOpen, setViewEditModalOpen] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(0);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);

  // ================================================================
  // ===            On page loading - Fetch expenses             ====
  // ================================================================
  const { isLoading, errorFetching, sendRequest: fetchExpenses } = useHttp();
  useEffect(() => {
    console.log("ExpensesMain useEffect called");
    const transformExpenses = (ExpenseObj) => {
      console.log(ExpenseObj);
      const loadedExpenses = [];
      for (const expense in ExpenseObj) {
        loadedExpenses.push({ ...ExpenseObj[expense], date: new Date(ExpenseObj[expense].date) });
      }
      setExpenses(loadedExpenses);
    };
    const requestConfig = {
      url: "http://localhost:8000/api/expenses",
    };
    fetchExpenses(requestConfig, transformExpenses);
  }, [fetchExpenses]);
  // ================================================================

  // ================================================================
  // Handle Add New Expense
  // ================================================================
  const expenseAddHandler = (expense) => {
    setExpenses((prevExpenses) => prevExpenses.concat(expense));
  };
  // console.log("AddExpenseHandler: Add Expense to the database");
  // const response = await axios.post(`/api/expenses`, newExpense).then((response) => {
  //   console.log("response in AddExpenseHandler: ");
  //   console.log(response.status);
  //   // Check response.status and display status message
  //   if (response.status !== 200) {
  //     console.log("setaddNewExpenseMessage: Error: response.status !== 200.");
  //     setMessage({
  //       type: MESSAGE_TYPE.ERROR,
  //       header: `Add New Expense`,
  //       body: `Error adding expense "${newExpense.title}", response.status: ${response.status}.`,
  //     });
  //   } else {
  //     console.log("setaddNewExpenseMessage: Expense added successfully.");
  //     setMessage({
  //       type: MESSAGE_TYPE.INFO,
  //       header: `Add New Expense`,
  //       body: `Expense "${newExpense.title}" added successfully.`,
  //     });
  //   }
  //   // Reload the expenses list from database
  //   setTriggerRefresh(!triggerRefresh);
  //});

  // ================================================================
  // Handle View/Edit Expense
  // ================================================================
  const viewEditHandler = (expenseId) => {
    console.log("viewEditHandler in App, id: " + expenseId);
    setEditExpenseId(expenseId);
    setViewEditModalOpen(true);
  };

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

  // ================================================================
  return (
    <div className={classes.main}>
      {message && <Message onMessageClose={handleMessageClose} message={message} />}

      {viewEditModalOpen && (
        <ViewEditExpense
          onViewEditExpenseClose={handleViewEditModalClose}
          editExpenseId={editExpenseId}
        />
      )}

      {!isLoading && <NewExpense onAddExpense={expenseAddHandler} allExpenses={expenses} />}

      {isLoading && (
        <div className={classes["loading-indicator"]}>
          <LoadingIndicator
            segmentWidth={10}
            segmentLength={20}
            spacing={10}
            color={{
              red: 225,
              green: 225,
              blue: 225,
              alpha: 0.85,
            }}
          />
        </div>
      )}
      {!isLoading && <Expenses items={expenses} onViewEditApp={viewEditHandler} />}
    </div>
  );
};

export default ExpensesMain;
