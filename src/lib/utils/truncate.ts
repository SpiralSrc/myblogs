export const truncate = (text: string) => {
  if (text.length < 150) return text;

  return text.substring(0, 150) + "...";
};
