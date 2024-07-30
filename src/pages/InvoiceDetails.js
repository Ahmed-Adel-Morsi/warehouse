import { useParams } from "react-router-dom";
import { getTransactionByInvoiceNumber } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../utils/convertDateFormat";
import PageHeader from "../components/PageHeader";
import MainButton from "../components/MainButton";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import useFetch from "../hooks/useFetch";
import { useEffect, useMemo, useState } from "react";

function InvoiceDetails({ type }) {
  const { invoiceNumber } = useParams();
  const params = useMemo(
    () => ({ type, invoiceNumber }),
    [type, invoiceNumber]
  );

  const {
    data: transactions,
    error,
    loading,
  } = useFetch(getTransactionByInvoiceNumber, "transactions", params);
  const [transaction, setTransaction] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    setTransaction(transactions.length > 0 ? transactions[0] : null);
  }, [transactions]);

  return (
    <>
      <PageHeader>فاتورة {type === "sell" ? "بيع" : "إضافة"}</PageHeader>
      {loading ? (
        <div className="p-4 text-center fs-small fw-medium">
          جارى التحميل...
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
                <CustomTable.Row last>
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
                  <CustomTable.Data body={transaction.totalPrice} last />
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
