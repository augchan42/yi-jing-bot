export const toss = () => {
  // traditional calculations to generate i-ching from coin flips
  // assign 'heads' the value of 3 and 'tails' the value of two
  return Math.floor(Math.random() * 2) === 0 ? 3 : 2;
};

export const generateLine = () => {
  // Each line's value is the sum of the values generated by the toss of three coins
  const value = toss() + toss() + toss();
  
  // Convert the numeric sum to the traditional line values
  // 6: old yin (changing)
  // 7: young yang (stable)
  // 8: young yin (stable)
  // 9: old yang (changing)
  return value.toString();
};