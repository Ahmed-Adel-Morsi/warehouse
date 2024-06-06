import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsOfType } from "../features/transactionsSlice";
import { showInvoicesSvg } from "../svgs/actionsSVGs";
import { Link } from "react-router-dom";
import convertDateFormat from "../elements/convertDateFormat";

function SoldInvoices() {
  const {
    filteredData: transactions,
    loading,
    error,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const filterItems = (value) => {
    setFilteredTransactions(
      transactions.filter(function (transaction) {
        return transaction.customerDetails.name
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getTransactionsOfType("sell")).unwrap();
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return (
    <>
      <div className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
        <input
          type="search"
          name="addTransactions"
          className="form-control w-100 mb-3 mb-lg-0 search-input pe-30px"
          onChange={(e) => {
            filterItems(e.target.value);
          }}
          placeholder="يمكنك البحث عن العميل بالإسم"
        />
      </div>
      <div className="border rounded mw-100 overflow-x-auto table-container">
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : error ? (
          <div className="p-4 text-center fs-small fw-medium">
            حدث خطأ ما
            <p>Error: {error}</p>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <table className="table table-hover table-borderless m-0">
            <thead>
              <tr className="table-light border-bottom">
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  اسم العميل
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  التاريخ
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  رقم الفاتورة
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  إجراءات
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index, arr) => (
                <tr
                  key={transaction.id}
                  className={index !== arr.length - 1 ? "border-bottom" : ""}
                >
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.customerDetails.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {convertDateFormat(transaction.createdAt) || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.invoiceNumber}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3 d-flex justify-content-center align-items-center">
                    <Link
                      to={`${transaction.invoiceNumber}`}
                      title="عرض الفاتورة"
                      className="list-group-item list-group-item-action gap-2 fs-small w-2rem h-2rem rounded btn-hov"
                    >
                      {showInvoicesSvg}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center fs-small fw-medium">
            لا يوجد بيانات
          </div>
        )}
      </div>
    </>
  );
}

export default SoldInvoices;
