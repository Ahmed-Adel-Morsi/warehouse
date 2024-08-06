import { useParams } from "react-router-dom";
import { getInvoiceNumberTransaction } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../utils/convertDateFormat";
import PageHeader from "../components/PageHeader";
import MainButton from "../components/MainButton";
import { Row, Data } from "../components/CustomTable";
import { useEffect } from "react";
import handlePrint from "../utils/handlePrint";
import { useDispatch, useSelector } from "react-redux";
import TableSection from "../components/TableSection";

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

      <TableSection
        loading={loading}
        error={error}
        dataLength={transaction ? 1 : 0}
        pageName={type === "sell" ? "soldInvoiceDetails" : "addInvoiceDetails"}
      >
        {transaction &&
          transaction.products.map((product, index, arr) => (
            <Row key={product._id} last={index === arr.length - 1}>
              <Data body={product.name} />
              <Data body={product.code} />
              <Data body={product.brand} />
              <Data body={product.size} />
              <Data body={product.color} />
              {type === "buy" && <Data body={product.location} />}
              <Data body={product.quantity} />
              <Data body={product.price} />
              <Data body={product.totalPrice} last />
            </Row>
          ))}
      </TableSection>

      <p className="mt-4 d-none d-print-block fw-bold fs-6">التوقيع:</p>
    </>
  );
}

export default InvoiceDetails;
