import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import Card from "../UI/Card";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpensesHandler = (enteredExpenseData) => {
    const enteredExpense = {
      ...enteredExpenseData,
    };
    props.onAddExpense(enteredExpense);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className='new-expense'>
      {props.insertStatus && <Card className='statusMessage'>{props.insertStatus}</Card>}
      {!isEditing && <button onClick={startEditingHandler}>Add New Expense</button>}
      {isEditing && (
        <ExpenseForm onSaveExpenseData={saveExpensesHandler} onCancel={stopEditingHandler} />
      )}
    </div>
  );
};

export default NewExpense;
