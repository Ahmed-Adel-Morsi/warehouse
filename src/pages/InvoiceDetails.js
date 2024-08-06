import { useParams } from "react-router-dom";
import { getInvoiceNumberTransaction } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../utils/convertDateFormat";
import PageHeader from "../components/PageHeader";
import MainButton from "../components/MainButton";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import { useEffect } from "react";
import handlePrint from "../utils/handlePrint";
import { useDispatch, useSelector } from "react-redux";

function InvoiceDetails({ type }) {
  const { invoiceNumber } = useParams();
  const {
    loading,
    error,
    transactions: AllTransactions,
    invoiceNumberTransaction: transaction,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getInvoiceNumberTransaction({
        type,
        invoiceNumber: parseInt(invoiceNumber),
      })
    );
  }, [dispatch, type, invoiceNumber, AllTransactions]);

  return (
    <>
      <PageHeader>فاتورة {type === "sell" ? "بيع" : "إضافة"}</PageHeader>

      {transaction && (
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-2 w-75 invoice-details">
            <p className="fw-semibold mb-0 align-self-center">
              اسم {type === "sell" ? "العميل" : "المورد"} :{" "}
              {transaction.customerDetails.name}
            </p>
            <p className="fw-semibold mb-0 align-self-center">
              تحريرا في : {convertDateFormat(transaction.createdAt)}
            </p>
            <p className="fw-semibold mb-0 align-self-center">
              رقم الفاتورة : {transaction.invoiceNumber}
            </p>
          </div>
          <div className="d-print-none">
            <MainButton
              btnIcon={printerSvg}
              clickHandler={handlePrint}
              btnTitle="طباعة"
            />
          </div>
        </div>
      )}

      <TableContainer>
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : error ? (
          <div className="p-4 text-center fs-small fw-medium">
            حدث خطأ ما:
            <p>{error.message}</p>
          </div>
        ) : transaction ? (
          <CustomTable>
            <thead>
              <CustomTable.Row header>
                <CustomTable.Data body="اسم الصنف" />
                <CustomTable.Data body="الكود" />
                <CustomTable.Data body="الماركة" />
                <CustomTable.Data body="الحجم" />
                <CustomTable.Data body="اللون" />
                {type === "buy" && <CustomTable.Data body="المكان" />}
                <CustomTable.Data body="العدد" />
                <CustomTable.Data body="السعر" />
                <CustomTable.Data body="الاجمالي" last />
              </CustomTable.Row>
            </thead>
            <tbody>
              {transaction.products.map((product, index, arr) => (
                <CustomTable.Row
                  key={product._id}
                  last={index === arr.length - 1}
                >
                  <CustomTable.Data body={product.name} />
                  <CustomTable.Data body={product.code} />
                  <CustomTable.Data body={product.brand} />
                  <CustomTable.Data body={product.size} />
                  <CustomTable.Data body={product.color} />
                  {type === "buy" && (
                    <CustomTable.Data body={product.location} />
                  )}
                  <CustomTable.Data body={product.quantity} />
                  <CustomTable.Data body={product.price} />
                  <CustomTable.Data body={product.totalPrice} last />
                </CustomTable.Row>
              ))}
            </tbody>
          </CustomTable>
        ) : (
          <div className="p-4 text-center fs-small fw-medium">
            لا يوجد بيانات
          </div>
        )}
      </TableContainer>
      <p className="mt-4 d-none d-print-block fw-bold fs-6">التوقيع:</p>
    </>
  );
}

export default InvoiceDetails;
