import { GenderOptions } from "@/constants";

export const findGenderByCategory = (
  data: GenderOptions[],
  searchValue: string | number
): string | null => {
  for (const item of data) {
    if (item.value === searchValue) {
      return item.label;
    } else if (item.children) {
      const childLabel = findGenderByCategory(item.children, searchValue);
      if (childLabel !== null) {
        return item.label;
      }
    }
  }
  return null;
};
