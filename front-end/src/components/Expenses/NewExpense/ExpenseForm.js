import React, { useState, useEffect } from "react";
import "./ExpenseForm.css";
import RoundCurrency from "../../Utils/RoundCurrency";
import Button from "../../UI/Button/Button";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  useEffect(() => {
    const existingExpense = props.existingExpense;
    let existingDate = existingExpense.date;
    if (existingDate) {
      console.log("ExpenseForm: Existing expense:");
      console.log(existingExpense);
      console.log(typeof existingDate);
      existingDate = existingDate.slice(0, 10);
      console.log(existingDate);
      setEnteredTitle(existingExpense.title);
      setEnteredAmount(existingExpense.amount);
      setEnteredDate(existingDate);
    }
  }, [props.existingExpense]);

  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      title: enteredTitle,
      amount: RoundCurrency(enteredAmount),
      date: new Date(enteredDate),
    };
    props.onSaveExpenseData(expenseData);
    console.log("ExpenseForm submitHandler - expenseData:");
    console.log(expenseData);
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='expense-form__controls'>
        <div className='expense-form__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={(e) => setEnteredTitle(e.target.value)}
            autoFocus
          />
        </div>
        <div className='expense-form__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={(e) => setEnteredAmount(e.target.value)}
          />
        </div>
        <div className='expense-form__control'>
          <label>Date</label>
          <input
            type='date'
            min='2022-01-01'
            max='2030-12-31'
            value={enteredDate}
            onChange={(e) => setEnteredDate(e.target.value)}
          />
        </div>
      </div>

      <div className='expense-form__actions'>
        <Button type='button' onClick={props.onCancel}>
          Cancel
        </Button>
        <Button type='submit'>{props.loading ? "Sending..." : "Add Expense"}</Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
