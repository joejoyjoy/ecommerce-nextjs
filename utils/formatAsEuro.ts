export const formatAsEuro = (number: number): string => {
  if (isNaN(number)) {
    throw new Error("Invalid input. Please provide a valid number.");
  }

  const euroString = `€${number.toFixed(2)}`;

  return euroString;
};