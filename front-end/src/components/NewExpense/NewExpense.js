import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import Card from "../UI/Card";
import Button from "../UI/Button";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const saveExpensesHandler = (enteredExpenseData) => {
    const enteredExpense = {
      ...enteredExpenseData,
    };

    props.onAddExpense(enteredExpense);
    setIsEntering(false);
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
        />
      )}
    </Card>
  );
};

export default NewExpense;
