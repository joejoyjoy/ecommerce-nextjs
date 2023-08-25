import { categoryOptions, genderOptions } from "@/constants";

export const getLabelOfGender = (value: string | number): string | null => {
  const item = genderOptions.find((option) => option.value === value);
  return item ? item.label : null;
};

export const getLabelOfCategory = (value: string | number): string | null => {
  const item = categoryOptions.find((option) => option.value === value);
  return item ? item.label : null;
};
