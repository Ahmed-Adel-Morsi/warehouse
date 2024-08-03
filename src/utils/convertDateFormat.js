function convertDateFormat(dateStr) {
  const dateObj = new Date(dateStr);
  return `${dateObj.getDate() < 10 ? "0" : ""}${dateObj.getDate()}/${
    dateObj.getMonth() + 1 < 10 ? "0" : ""
  }${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}

export default convertDateFormat;
