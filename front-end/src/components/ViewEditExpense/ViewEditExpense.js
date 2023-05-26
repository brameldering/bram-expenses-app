import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ExpenseForm from "../NewExpense/ExpenseForm";
import Card from "../UI/Card";
import "./ViewEditExpense.css";

const statusModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
};

let editedExpense = { id: 1, date: new Date(2023, 3, 31), title: "Insurance", amount: 1000 };

const ViewEditExpense = (props) => {
  const existingExpenseId = props.editExpenseId;

  // ================================================================
  // Load Expense from the database using axios API to server.js
  useEffect(() => {
    console.log("====================================");
    console.log("useEffect in ViewEditExpense called");
    const loadExpense = async () => {
      const response = await axios.get(`/api/expenses/${existingExpenseId}`);
      console.log("response.data");
      console.log(response.data);
      editedExpense = response.data;

      // editedExpense.date = new Date(editedExpense.date); // convert date string to Date object for each expense
    };
    loadExpense(); // this inner function is defined above and called here because useEffect cannot be async
  }, [existingExpenseId]);
  // ================================================================

  const saveExpensesHandler = (editedExpenseData) => {
    const editedExpense = {
      ...editedExpenseData,
    };

    // props.onAddExpense(editedExpense);
    //setIsEditing(false);
  };

  return (
    <>
      <Modal
        open={props.statusModalOpen}
        onClose={props.handleStatusModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Card className='view-edit-expense'>
          <ExpenseForm
            existingExpense={editedExpense}
            onSaveExpenseData={saveExpensesHandler}
            onCancel={props.handleStatusModalClose}
          />
        </Card>
      </Modal>
    </>
  );
};

export default ViewEditExpense;
