export const generateSKU = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

export const generateRating = (): number => {
  const possibleRatings = [
    2.5, 3, 3.5, 3.5, 3.5, 4, 4, 4, 4.5, 4.5, 4.5, 4.5, 5, 5, 5,
  ];
  const randomIndex = Math.floor(Math.random() * possibleRatings.length);
  return possibleRatings[randomIndex];
};

export const generateNumber = (): number => {
  const min = 23;
  const max = 230;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
