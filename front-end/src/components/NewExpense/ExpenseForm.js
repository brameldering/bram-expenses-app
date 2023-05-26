import React, { useState } from "react";
import "./ExpenseForm.css";
import RoundCurrency from "../Utils/RoundCurrency";
import Button from "../UI/Button";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: RoundCurrency(enteredAmount),
      date: new Date(enteredDate),
    };
    props.onSaveExpenseData(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='expense-form__controls'>
        <div className='expense-form__control'>
          <label>Title</label>
          <input type='text' value={enteredTitle} onChange={titleChangeHandler} autoFocus />
        </div>
        <div className='expense-form__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='expense-form__control'>
          <label>Date</label>
          <input
            type='date'
            min='2022-01-01'
            max='2030-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>

      <div className='expense-form__actions'>
        <Button type='button' onClick={props.onCancel}>
          Cancel
        </Button>
        <Button type='submit'>Add Expense</Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
