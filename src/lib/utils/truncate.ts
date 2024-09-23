export const truncate = (text: string) => {
  if (text.length < 150) return text;

  return text.substring(0, 150) + "...";
};

export const truncateTitle = (text: string) => {
  if (text.length < 19) return text;

  return text.substring(0, 19) + "...";
};

export const truncateTitle2 = (text: string) => {
  if (text.length < 25) return text;

  return text.substring(0, 25) + "...";
};

export const truncateDesc = (text: string) => {
  if (text.length < 70) return text;

  return text.substring(0, 70) + "...";
};
