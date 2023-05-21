import React from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import RoundCurrency from "../Utils/RoundCurrency";

export default function ExpenseItem({ item }) {
  return (
    <Card className='expense-item'>
      <div>
        <ExpenseDate date={item.date} />
      </div>
      <div className='expense-item__description'>
        <h2>{item.title}</h2>
        <div className='expense-item__price'>${RoundCurrency(item.amount)}</div>
      </div>
    </Card>
  );
}
