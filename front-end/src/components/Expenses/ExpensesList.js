import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  // check if there are expenses and if not then show default message
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
  }
  // if there are expenses then show them
  return (
    <ul className='expenses-list'>
      {props.items.map((item) => (
        <li key={item.id}>
          <ExpenseItem key={item.id} item={item} />
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
