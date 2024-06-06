import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transactionsSlice";
import convertDateFormat from "../elements/convertDateFormat";

function Transactions() {
  const {
    data: transactions,
    loading,
    error,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const filterItems = (value) => {
    setFilteredTransactions(
      transactions.filter(function (transaction) {
        return transaction.productDetails.name
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTransactions()).unwrap();
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
          placeholder="يمكنك البحث عن الصنف بالإسم"
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
                  اسم الصنف
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  حركة الصنف
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  الكود
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  الماركة
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  العدد
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  السعر
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  العميل
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  التاريخ
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
                    {transaction.productDetails.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    <span
                      className={`badge px-2 py-1 text-bg-${
                        transaction.transactionType === "sell"
                          ? "light"
                          : "dark"
                      }`}
                    >
                      {transaction.transactionType === "sell" ? "بيع" : "اضافة"}
                    </span>
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.productDetails.code || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.productDetails.brand || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.quantity || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.price || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.customerDetails.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {convertDateFormat(transaction.createdAt) || "-"}
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

export default Transactions;
