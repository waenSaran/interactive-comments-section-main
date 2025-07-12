export const formattedDate = (dateObj: Date) => {
  const dateString = new Date(dateObj).toLocaleString();
  const [date, time] = dateString.split(',');
  const [m, d, y] = date.split('/');
  return `${d}/${m}/${y}, ${time}`;
};