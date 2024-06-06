import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTransactionByInvoiceNumber } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../elements/convertDateFormat";
import PageHeader from "../components/PageHeader";
import { Spinner } from "react-bootstrap";

function InvoiceDetails({ type }) {
  const { invoiceNumber } = useParams();
  const {
    transactionByInvoice: transaction,
    error,
    loading,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    dispatch(
      getTransactionByInvoiceNumber({
        type,
        invoiceNumber: parseInt(invoiceNumber),
      })
    );
  }, [dispatch, type, invoiceNumber]);

  return (
    <>
      <PageHeader>فاتورة {type === "sell" ? "بيع" : "إضافة"}</PageHeader>
      {loading ? (
        <div className="p-4 text-center fs-small fw-medium">
          <Spinner animation="border" size="sm" />
        </div>
      ) : error ? (
        <div className="p-4 text-center fs-small fw-medium">
          حدث خطأ ما
          <p>Error: {error}</p>
        </div>
      ) : transaction ? (
        <>
          <div className="mb-3 d-flex flex-column flex-lg-row justify-content-between gap-2">
            <p className="fw-semibold m-0 align-self-center">
              اسم {type === "sell" ? "العميل" : "المورد"} :{" "}
              {transaction.customerDetails.name}
            </p>
            <p className="fw-semibold m-0 align-self-center">
              تحريرا في : {convertDateFormat(transaction.createdAt)}
            </p>
            <p className="fw-semibold m-0 align-self-center">
              رقم الفاتورة : {transaction.invoiceNumber}
            </p>
            <button
              type="button"
              className={`btn ${
                theme === "dark" ? "btn-light" : "btn-dark"
              } d-flex align-items-center justify-content-center fs-small fw-medium py-2 px-3 gap-1 d-print-none`}
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
                    الكود
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    الماركة
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    الحجم
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    اللون
                  </td>
                  {type === "buy" && (
                    <td className="border-start fs-small fw-medium text-center align-middle p-3">
                      المكان
                    </td>
                  )}
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    العدد
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    السعر
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    الاجمالي
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.productDetails.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.productDetails.code || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.productDetails.brand || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.productDetails.size || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.productDetails.color || "-"}
                  </td>
                  {type === "buy" && (
                    <td className="border-start fs-small fw-medium text-center align-middle p-3">
                      {transaction.productDetails.location || "-"}
                    </td>
                  )}
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.quantity || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.price || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {transaction.totalPrice || "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 d-none d-print-block fw-bold fs-6">التوقيع:</p>
        </>
      ) : (
        <div className="p-4 text-center fs-small fw-medium">لا يوجد بيانات</div>
      )}
    </>
  );
}

export default InvoiceDetails;
