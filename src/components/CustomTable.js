function CustomTable({ children }) {
  return (
    <table className="table table-hover table-borderless m-0">{children}</table>
  );
}

CustomTable.Row = function ({ children, header = false, last = false }) {
  return (
    <tr
      className={`${header ? "table-head" : ""} ${
        !last ? "border-bottom" : ""
      }`}
    >
      {children}
    </tr>
  );
};

CustomTable.Data = function ({ body, last = false, classes = false }) {
  return (
    <td
      className={`${
        !last ? "border-start" : ""
      } fs-small fw-medium text-center align-middle p-3 ${
        classes ? classes : ""
      }`}
    >
      {body || "-"}
    </td>
  );
};

export default CustomTable;
