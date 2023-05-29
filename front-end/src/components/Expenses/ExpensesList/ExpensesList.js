import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  // check if there are expenses and if not then show default message
  const expenses = props.items;
  if (expenses.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
  }
  // sort expenses by date ascending
  expenses.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const viewEditHandler = (event) => {
    console.log("viewEditHandler in ExpensesList, id: " + event.target.id);
    props.onViewEditExpenses(event.target.id);
  };

  // if there are expenses then show them
  return (
    <ul className='expenses-list'>
      {expenses.map((item) => (
        <li key={item.id}>
          <ExpenseItem key={item.id} item={item} onViewEdit={viewEditHandler} />
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
