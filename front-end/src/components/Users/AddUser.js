import react from "react";

import Button from "../UI/Button/Button";

const AddUser = () => {
  const addUserHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={addUserHandler}>
      <label htmlFor='username'>Username</label>
      <input id='username' type='text' />
      <label htmlFor='age'>Age (Years)</label>
      <input id='age' type='number' />
      <Button type='submit'>Add User</Button>
    </form>
  );
};

export default AddUser;
