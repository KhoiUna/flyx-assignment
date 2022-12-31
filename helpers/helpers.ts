export const formatData = (text: string) => {
  const textNoSpaces = text.replace("\n", "");

  let lines = textNoSpaces.split("\n").filter((i) => i.length > 0);
  lines = lines.map((line) => line.replace(/[0-9]+./g, "").trim());

  return lines;
};
