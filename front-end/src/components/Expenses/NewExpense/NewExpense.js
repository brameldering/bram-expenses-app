import React, { useState } from "react";

import CalculateNextId from "../../Utils/CalculateNextId";
import { MESSAGE_TYPE } from "../../UI/Message/MessageTypeClassName";
import useHttp from "../../../hooks/use-http";

import ExpenseForm from "./ExpenseForm";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";

import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const { isLoading, error, sendRequest: addTask } = useHttp();

  // Temporary solution, this is only needed to calculate next if.
  // to think of better approach, to implement as an API that gets the next ID from the database
  // but to keep in mind that the update of this next id needs to check again if the ID is still the latest
  const allExpenses = props.allExpenses;

  const addExpenseToMainArray = (newExpense) => {
    props.onAddExpense(newExpense);
  };

  const saveExpensesHandler = (enteredExpenseData) => {
    console.log("saveExpensesHandler called");

    // test that input is valid
    const d = new Date(enteredExpenseData.date);
    if (
      !enteredExpenseData.title ||
      isNaN(enteredExpenseData.amount) ||
      !(d instanceof Date && !isNaN(d))
    ) {
      console.log("Title, Amount, and Date are required, and need to be valid.`");
      // Display error message in Modal
      // setMessage({
      //   type: MESSAGE_TYPE.ERROR,
      //   header: `Add New Expense`,
      //   body: `Title, Amount, and Date are required, and need to be valid.`,
      // });
    } else {
      // Input ok
      // Calculate nextId and complete the newExpense object with id and dateAdded
      const nextId = CalculateNextId(allExpenses);
      const now = new Date();
      const newExpense = {
        ...enteredExpenseData,
        id: nextId,
        dateAdded: now,
        dateAddedOffset: now.getTimezoneOffset(),
      };

      const requestConfig = {
        url: "http://localhost:8000/api/expenses",
        method: "POST",
        body: { ...newExpense },
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("requestConfig:");
      console.log(requestConfig);
      addTask(requestConfig, addExpenseToMainArray.bind(null, newExpense));

      setIsEntering(false);
    }
  };

  const startEnteringExpenseHandler = () => {
    setIsEntering(true);
  };

  const stopEnteringExpenseHandler = () => {
    setIsEntering(false);
  };

  return (
    <Card className='new-expense'>
      {!isEntering && <Button onClick={startEnteringExpenseHandler}>Add New Expense</Button>}
      {isEntering && (
        <ExpenseForm
          onSaveExpenseData={saveExpensesHandler}
          onCancel={stopEnteringExpenseHandler}
          loading={isLoading}
        />
      )}
    </Card>
  );
};

export default NewExpense;
