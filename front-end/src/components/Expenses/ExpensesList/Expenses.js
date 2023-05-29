import React, { useState } from "react";

import "./Expenses.css";
import Card from "../../UI/Card/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

export default function Expenses(props) {
  console.log("Expenses");
  const [filteredYear, setFilteredYear] = useState("2022");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  const expenseViewEditHandler = (expenseId) => {
    console.log("viewEditHandler in Expenses, id: " + expenseId);
    props.onViewEditApp(expenseId);
  };

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        <ExpensesChart items={filteredExpenses} />
        <ExpensesList items={filteredExpenses} onViewEditExpenses={expenseViewEditHandler} />
      </Card>
    </div>
  );
}
