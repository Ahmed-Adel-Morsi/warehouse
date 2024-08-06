import tableHeaders from "../utils/tableHeaders";
import { Row, Data } from "./CustomTable";

function TableSection({ children, error, loading, pageName, dataLength }) {
  return (
    <div className="border rounded overflow-x-auto mt-3 table-container">
      {loading ? (
        <div className="p-4 text-center fs-small fw-medium">
          جارى التحميل...
        </div>
      ) : error ? (
        <div className="p-4 text-center fs-small fw-medium">
          حدث خطأ ما:
          <p>{error.message}</p>
        </div>
      ) : dataLength > 0 ? (
        <table className="table table-hover table-borderless fs-small fw-medium m-0 w-100">
          {pageName && (
            <thead>
              <Row header>
                {tableHeaders[pageName].length > 0 &&
                  tableHeaders[pageName].map((header, index, arr) => (
                    <Data
                      key={header}
                      body={header}
                      last={index + 1 === arr.length}
                    />
                  ))}
              </Row>
            </thead>
          )}
          {children && <tbody>{children}</tbody>}
        </table>
      ) : (
        <div className="p-4 text-center fs-small fw-medium">لا يوجد بيانات</div>
      )}
    </div>
  );
}

export default TableSection;
