const RoundCurrency = (value) => {
  if (value === undefined || isNaN(value)) {
    return 0.0;
  }
  let numberValue = Number(value);
  let roundedValue = Math.round(numberValue * 100) / 100;
  return roundedValue.toFixed(2);
};
export default RoundCurrency;
