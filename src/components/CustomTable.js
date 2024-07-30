function CustomTable({ children }) {
  return (
    <table className="table table-hover table-borderless fs-small fw-medium m-0 w-100">
      {children}
    </table>
  );
}

CustomTable.Row = function ({ children, header, last }) {
  return (
    <tr
      className={`text-center btn-hov${header ? " table-head" : ""}${
        !last ? " border-bottom" : ""
      }`}
    >
      {children}
    </tr>
  );
};

CustomTable.Data = function ({ body, last, classes }) {
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
