const formatDate = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  const limited = numbers.slice(0, 8);

  if (limited.length <= 2) {
    return limited;
  }

  if (limited.length <= 4) {
    return `${limited.slice(0, 2)}/${limited.slice(2)}`;
  }

  return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
};

const formatDateToApi = (date: string): string => {
  const [day, month, year] = date.split("/");

  return `${year}-${month}-${day}`;
};

export { formatDate, formatDateToApi };
