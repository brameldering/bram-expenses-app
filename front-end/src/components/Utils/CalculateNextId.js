const CalculateNextId = (items) => {
  let nextId = 1;
  // loop through the expenses array and find the highest id
  items.forEach((item) => {
    if (item.id > nextId) {
      nextId = item.id;
    }
  });
  nextId += 1;
  console.log("calculateNextId: " + nextId);
  return nextId;
};

export default CalculateNextId;
