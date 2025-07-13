export const renderTimestamp = (datestring: string) => {
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "always", // other values: "auto"
    style: "long", // other values: "short" or "narrow"
  });

  // Invalid Date
  if (isNaN(Date.parse(datestring))) {
    return datestring;
  }

  const dateObj = new Date(datestring);
  const timeDiff = dateObj.getTime() - Date.now();

  if (Date.now() - dateObj.getTime() < 1000) {
    return "Just now";
  }

  // pass by second
  if (Date.now() - dateObj.getTime() < 60 * 1000) {
    const sec = Math.round(timeDiff / 1000);
    return rtf.format(sec, "seconds");
  }

  // pass by minute
  if (Date.now() - dateObj.getTime() < 60 * 60 * 1000) {
    const min = Math.round(timeDiff / 1000 / 60);
    return rtf.format(min, "minutes");
  }

  // pass by hour
  if (Date.now() - dateObj.getTime() < 24 * 60 * 60 * 1000) {
    const hours = Math.round(timeDiff / 1000 / 60 / 60);
    return rtf.format(hours, "hours");
  }

  // pass by day
  if (Date.now() - dateObj.getTime() < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.round(timeDiff / 1000 / 60 / 60 / 24);
    return rtf.format(days, "days");
  }

  // pass by week
  if (Date.now() - dateObj.getTime() < 7 * 24 * 60 * 60 * 1000 * 7) {
    const weeks = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 7);
    return rtf.format(weeks, "weeks");
  }

  // pass by month
  if (Date.now() - dateObj.getTime() < 7 * 24 * 60 * 60 * 1000 * 7 * 4) {
    const months = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 7 / 4);
    return rtf.format(months, "months");
  }

  // pass by year
  if (Date.now() - dateObj.getTime() < 7 * 24 * 60 * 60 * 1000 * 7 * 4 * 12) {
    const years = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 7 / 4 / 12);
    return rtf.format(years, "years");
  }

  return dateObj.toDateString();
};
