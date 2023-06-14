import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ExpenseForm from "../NewExpense/ExpenseForm";
import Card from "../../UI/Card/Card";
import classes from "./ViewEditExpense.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onViewEditExpenseClose}></div>;
};

const ModalOverlay = (props) => {
  console.log("ModalOverlay in ViewEditExpense, props.existingExpense: ");
  console.log(props.existingExpense);
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>View/Edit Expense</h2>
      </header>
      <ExpenseForm
        existingExpense={props.existingExpense}
        onSaveExpenseData={props.onSaveExpenseData}
        onCancel={props.onCancel}
      />
    </Card>
  );
};

const ViewEditExpense = (props) => {
  const existingExpenseId = props.editExpenseId;
  const [existingExpense, setExistingExpense] = useState({});
  console.log("existingExpenseId: " + existingExpenseId);

  // ================================================================
  // Load Expense from the database using axios API to server.js
  useEffect(() => {
    console.log("useEffect in ViewEditExpense called");
    const loadExpense = async () => {
      console.log("existingExpenseId: " + existingExpenseId);
      const response = await axios.get(`/api/expenses/${existingExpenseId}`);
      console.log("response.data");
      console.log(response.data);
      setExistingExpense(response.data);

      // editedExpense.date = new Date(editedExpense.date); // convert date string to Date object for each expense
    };
    loadExpense(); // this inner function is defined above and called here because useEffect cannot be async
  }, [existingExpenseId]);
  // ================================================================

  const saveExpensesHandler = (editedExpenseData) => {
    setExistingExpense(editedExpenseData);
    console.log("saveExpensesHandler: title: " + editedExpenseData.title);
    //props.onSaveEditedExpense(editedExpenseData);
    //setIsEditing(false);
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onViewEditExpenseClose={props.onViewEditExpenseClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          existingExpense={existingExpense}
          onSaveExpenseData={saveExpensesHandler}
          onCancel={props.onViewEditExpenseClose}
        />,
        document.getElementById("overlay-root")
      )}
      ;
    </React.Fragment>
  );
};

export default ViewEditExpense;
