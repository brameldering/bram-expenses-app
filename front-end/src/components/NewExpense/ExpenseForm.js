import React, { useRef } from "react";
import "./ExpenseForm.css";
import RoundCurrency from "../Utils/RoundCurrency";
import Button from "../UI/Button/Button";

const ExpenseForm = (props) => {
  const enteredTitleRef = useRef();
  const enteredAmountRef = useRef();
  const enteredDateRef = useRef();

  // State hooks for form inputs have been replaced by useRef hooks
  // ===================================================
  // const [enteredTitle, setEnteredTitle] = useState("");
  // const [enteredAmount, setEnteredAmount] = useState("");
  // const [enteredDate, setEnteredDate] = useState("");

  // const titleChangeHandler = (event) => {
  //   setEnteredTitle(event.target.value);
  // };
  // const amountChangeHandler = (event) => {
  //   setEnteredAmount(event.target.value);
  // };
  // const dateChangeHandler = (event) => {
  //   setEnteredDate(event.target.value);
  // };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitleRef.current.value,
      amount: RoundCurrency(enteredAmountRef.current.value),
      date: new Date(enteredDateRef.current.value),
    };
    props.onSaveExpenseData(expenseData);
    // setEnteredTitle("");
    // setEnteredAmount("");
    // setEnteredDate("");
    enteredTitleRef.current.value = "";
    enteredAmountRef.current.value = "";
    enteredDateRef.current.value = "";
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='expense-form__controls'>
        <div className='expense-form__control'>
          <label>Title</label>
          {/* <input type='text' value={enteredTitle} onChange={titleChangeHandler} autoFocus /> */}
          <input type='text' ref={enteredTitleRef} autoFocus />
        </div>
        <div className='expense-form__control'>
          <label>Amount</label>
          {/* <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          /> */}
          <input type='number' min='0.01' step='0.01' ref={enteredAmountRef} />
        </div>
        <div className='expense-form__control'>
          <label>Date</label>
          {/* <input
            type='date'
            min='2022-01-01'
            max='2030-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          /> */}
          <input type='date' min='2022-01-01' max='2030-12-31' ref={enteredDateRef} />
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
