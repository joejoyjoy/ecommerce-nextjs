export const formatUriLabel = (label: string): string => {
  const labelMappings: { [key: string]: string } = {
    womens: "women's",
  };

  if (labelMappings[label]) {
    return labelMappings[label];
  }

  return label
    .replace(/-([a-zA-Z])/g, (_, match) => ` ${match.toUpperCase()}`)
    .replace(/-/g, " ")
    .split(" ")
    .map((word, index) => (index === 0 ? capitalize(word) : word))
    .join(" ");
};

const capitalize = (s: string): string => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
