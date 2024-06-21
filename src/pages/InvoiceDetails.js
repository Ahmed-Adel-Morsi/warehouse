import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTransactionByInvoiceNumber } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../elements/convertDateFormat";
import PageHeader from "../components/PageHeader";
import { Spinner } from "react-bootstrap";
import MainButton from "../components/MainButton";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";

function InvoiceDetails({ type }) {
  const { invoiceNumber } = useParams();
  const {
    transactionByInvoice: transaction,
    error,
    loading,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

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
            <div className="d-block d-print-none">
              <MainButton
                btnIcon={printerSvg}
                clickHandler={handlePrint}
                btnTitle="طباعة"
              />
            </div>
          </div>
          <TableContainer>
            <CustomTable>
              <thead>
                <CustomTable.Row header={true}>
                  <CustomTable.Data body="اسم الصنف" />
                  <CustomTable.Data body="الكود" />
                  <CustomTable.Data body="الماركة" />
                  <CustomTable.Data body="الحجم" />
                  <CustomTable.Data body="اللون" />
                  {type === "buy" && <CustomTable.Data body="المكان" />}
                  <CustomTable.Data body="العدد" />
                  <CustomTable.Data body="السعر" />
                  <CustomTable.Data body="الاجمالي" last={true} />
                </CustomTable.Row>
              </thead>
              <tbody>
                <CustomTable.Row last={true}>
                  <CustomTable.Data body={transaction.productDetails.name} />
                  <CustomTable.Data body={transaction.productDetails.code} />
                  <CustomTable.Data body={transaction.productDetails.brand} />
                  <CustomTable.Data body={transaction.productDetails.size} />
                  <CustomTable.Data body={transaction.productDetails.color} />
                  {type === "buy" && (
                    <CustomTable.Data
                      body={transaction.productDetails.location}
                    />
                  )}
                  <CustomTable.Data body={transaction.quantity} />
                  <CustomTable.Data body={transaction.price} />
                  <CustomTable.Data body={transaction.totalPrice} last={true} />
                </CustomTable.Row>
              </tbody>
            </CustomTable>
          </TableContainer>
          <p className="mt-4 d-none d-print-block fw-bold fs-6">التوقيع:</p>
        </>
      ) : (
        <div className="p-4 text-center fs-small fw-medium">لا يوجد بيانات</div>
      )}
    </>
  );
}

export default InvoiceDetails;
