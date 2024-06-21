function CustomTable({ children }) {
  return (
    <table className="table table-hover table-borderless fs-small fw-medium m-0 w-100">
      {children}
    </table>
  );
}

CustomTable.Row = function ({ children, header = false, last = false }) {
  return (
    <tr
      className={`text-center${header ? " table-head" : ""}${
        !last ? " border-bottom" : ""
      }`}
    >
      {children}
    </tr>
  );
};

CustomTable.Data = function ({ body, last = false, classes = false }) {
  return (
    <td
      className={`align-middle p-3${!last ? " border-start" : ""}${
        classes ? ` ${classes}` : ""
      }`}
    >
      {body || "-"}
    </td>
  );
};

export default CustomTable;
