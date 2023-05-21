import React, { useState, useEffect } from "react";
import axios from "axios";
import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

// const initExpenses = [
//   { id: 1, date: new Date(2023, 3, 31), title: "Insurance", amount: 1000 },
//   { id: 2, date: new Date(2023, 5, 1), title: "Birds", amount: 1232.82 },
//   { id: 3, date: new Date(2023, 5, 12), title: "Health", amount: 1882.22 },
//   { id: 4, date: new Date(2022, 8, 12), title: "Juno", amount: 382.22 },
// ];

const initExpenses = [{ id: 0, date: new Date(), title: "", amount: 0 }];

const App = () => {
  const [expenses, setExpenses] = useState(initExpenses);
  const [insertStatus, setInsertStatus] = useState("");
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
        // convert date string to Date object for each expense
        expense.date = new Date(expense.date);
      });
      setExpenses(response.data);
    };
    loadExpenses(); // this inner function is defined above and called here because useEffect cannot be async
  }, [triggerRefresh]);
  // ================================================================

  const calculateNextId = () => {
    let nextId = 1;
    // loop through the expenses array and find the highest id
    expenses.forEach((expense) => {
      if (expense.id > nextId) {
        nextId = expense.id;
      }
    });
    // add 1 to the highest id to get the next id
    nextId += 1;
    return nextId;
  };

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
    const nextId = calculateNextId();
    const newExpense = {
      ...enteredExpenseData,
      id: nextId,
    };
    setExpenses((prevExpenses) => {
      return [newExpense, ...prevExpenses];
    });
    // Add Expense to the database using axios API to server.js
    console.log("AddExpenseHandler: Add Expense to the database");
    const response = await axios.post(`/api/expenses`, newExpense);
    console.log("response: ");
    console.log(response.status);
    // TO DO: Check response.status and display error message if needed
    if (response.status !== 200) {
      setInsertStatus("Error: response.status: " + response.status);
      console.log("Error: response.status !== 200");
    } else {
      setInsertStatus("Expense added successfully");
    }
    // refresh the expenses list from database or just wait for the next refresh
    // Possibly by using a state change to trigger the useEffect call
    setTriggerRefresh(!triggerRefresh);
  };

  // TO DO: Move the status message to the NewExpense component
  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} insertStatus={insertStatus} />
      <Expenses items={expenses} />
    </div>
  );

  // Traditional React JavaScript
  // return React.createElement(
  //   "div",
  //   {},
  //   React.createElement("h2", {}, "Expense list React"),
  //   React.createElement(Expenses, { items: expenses }, "")
  // );
};

export default App;
