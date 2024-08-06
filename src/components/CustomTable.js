const Row = function ({ children, header, last }) {
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

const Data = function ({ body, last, classes }) {
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

export { Row, Data };
