import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTransactionsByProductId } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../elements/convertDateFormat";
import PageHeader from "../components/PageHeader";
import { Spinner } from "react-bootstrap";

function ItemDetails() {
  const { productId } = useParams();
  const {
    transactionsByProductId: transactions,
    error,
    loading,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    dispatch(getTransactionsByProductId(productId));
  }, [dispatch, productId]);
  return (
    <>
      <PageHeader>
        حركة الصنف -{" "}
        {!loading &&
          !error &&
          transactions.length > 0 &&
          transactions[0].productDetails.name}
      </PageHeader>
      {loading ? (
        <div className="p-4 text-center fs-small fw-medium">
          <Spinner animation="border" size="sm" />
        </div>
      ) : error ? (
        <div className="p-4 text-center fs-small fw-medium">
          حدث خطأ ما
          <p>Error: {error}</p>
        </div>
      ) : transactions.length > 0 ? (
        <>
          <div className="mb-3 d-flex flex-column flex-lg-row justify-content-end d-print-none">
            <button
              type="button"
              className={`btn ${
                theme === "dark" ? "btn-light" : "btn-dark"
              } d-flex align-items-center justify-content-center fs-small fw-medium py-2 px-3 gap-1`}
              onClick={handlePrint}
            >
              طباعة
              {printerSvg}
            </button>
          </div>
          <div className="border rounded mw-100 overflow-x-auto table-container">
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
                {transactions.map(
                  (transaction, index, arr) =>
                    transaction.productDetails.id === productId && (
                      <tr
                        key={transaction.id}
                        className={
                          index !== arr.length - 1 ? "border-bottom" : ""
                        }
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
                            {transaction.transactionType === "sell"
                              ? "بيع"
                              : "اضافة"}
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
                    )
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="p-4 text-center fs-small fw-medium">لا يوجد بيانات</div>
      )}
    </>
  );
}

export default ItemDetails;
