const CalculateNextId = (items) => {
  console.log("calculateNextId: items: ");
  console.log(items);

  let nextId = 1;
  // loop through the expenses array and find the highest id
  items.forEach((item) => {
    if (item.id > nextId) {
      nextId = item.id;
    }
  });
  nextId += 1;
  return nextId;
};

export default CalculateNextId;
