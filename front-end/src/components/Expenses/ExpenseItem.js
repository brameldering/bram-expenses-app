import React from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import Button from "../UI/Button";
import RoundCurrency from "../Utils/RoundCurrency";

export default function ExpenseItem({ item, onViewEdit }) {
  return (
    <Card className='expense-item'>
      <div>
        <ExpenseDate date={item.date} />
      </div>
      <div className='expense-item__description'>
        <h2>
          {item.title} ID: {item.id}
        </h2>
        <div className='expense-item__price'>${RoundCurrency(item.amount)}</div>
        <div className='view-edit-expense'>
          <Button id={item.id} onClick={onViewEdit}>
            View/Edit Expense
          </Button>
        </div>
      </div>
    </Card>
  );
}
