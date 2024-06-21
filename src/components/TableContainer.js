function TableContainer({ children }) {
  return (
    <div className="border rounded overflow-x-auto mt-3 table-container">
      {children}
    </div>
  );
}

export default TableContainer;
