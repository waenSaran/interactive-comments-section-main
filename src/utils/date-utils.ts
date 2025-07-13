export const formattedDate = (dateObj: Date) => {
  const dateString = new Date(dateObj).toLocaleString();
  console.log(dateString);
  
  const [date, time] = dateString.split(',');
  const [m, d, y] = date.split('/');
  return `${d}/${m}/${y}, ${time}`;
};