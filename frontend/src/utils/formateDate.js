
export const formateDate = (dateInput, config) => {
  const defaultOptions = { day: "numeric", month: "long", year: "numeric" };
  const options = config ? config : defaultOptions;

  // Accept a Date instance or any value that can be passed to Date
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  // If the date is invalid, return an empty string
  if (Number.isNaN(date.getTime())) return "";

  // Return a localized formatted date string
  return date.toLocaleDateString("en-US", options);
};
