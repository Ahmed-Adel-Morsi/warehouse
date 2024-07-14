function convertDateFormat(dateStr) {
  const dateObj = new Date(dateStr);
  return `${dateObj.getDate()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getFullYear()}`;
}

export default convertDateFormat;
