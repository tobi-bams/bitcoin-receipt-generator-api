function dateFormatter(date) {
  const dateString = new Date(date * 1000);
  let month = dateString.toLocaleString("default", { month: "long" });
  let year = dateString.getFullYear();
  let day = dateString.getDate();
  let time = dateString.toLocaleTimeString();
  return `${month} ${day} ${year} ${time}`;
}

module.exports = { dateFormatter };
