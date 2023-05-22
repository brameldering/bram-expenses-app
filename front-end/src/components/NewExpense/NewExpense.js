import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
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
    <div className='new-expense'>
      {!isEntering && <button onClick={startEnteringExpenseHandler}>Add New Expense</button>}
      {isEntering && (
        <ExpenseForm
          onSaveExpenseData={saveExpensesHandler}
          onCancel={stopEnteringExpenseHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
