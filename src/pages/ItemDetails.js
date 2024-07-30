import { useParams } from "react-router-dom";
import {
  getTransactionsByCustomerId,
  getTransactionsByProductId,
} from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../utils/convertDateFormat";
import PageHeader from "../components/PageHeader";
import MainButton from "../components/MainButton";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

function ItemDetails({ type }) {
  const { productId, customerId } = useParams();
  const {
    data: transactions,
    error,
    loading,
  } = useFetch(
    productId ? getTransactionsByProductId : getTransactionsByCustomerId,
    "transactions",
    productId ? productId : customerId
  );

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <>
      <PageHeader>
        حركة{" "}
        {type === "customer"
          ? "العميل"
          : type === "vendor"
          ? "المورد"
          : "الصنف"}
        {!loading && !error && transactions.length > 0
          ? type === "vendor" || type === "customer"
            ? ` - ${transactions[0].customerDetails.name}`
            : ` - ${transactions[0].productDetails.name}`
          : ""}
      </PageHeader>
      {loading ? (
        <div className="p-4 text-center fs-small fw-medium">
          جارى التحميل...
        </div>
      ) : error ? (
        <div className="p-4 text-center fs-small fw-medium">
          حدث خطأ ما
          <p>Error: {error}</p>
        </div>
      ) : transactions.length > 0 ? (
        <>
          <div className="d-flex flex-column flex-lg-row justify-content-end d-print-none">
            <MainButton
              btnIcon={printerSvg}
              clickHandler={handlePrint}
              btnTitle="طباعة"
            />
          </div>
          <TableContainer>
            <CustomTable>
              <thead>
                <CustomTable.Row header>
                  <CustomTable.Data body="اسم الصنف" />
                  <CustomTable.Data body="حركة الصنف" />
                  <CustomTable.Data body="الكود" />
                  <CustomTable.Data body="الماركة" />
                  <CustomTable.Data body="العدد" />
                  <CustomTable.Data body="السعر" />
                  <CustomTable.Data body="العميل" />
                  <CustomTable.Data body="التاريخ" last />
                </CustomTable.Row>
              </thead>
              <tbody>
                {transactions.map((transaction, index, arr) => (
                  <CustomTable.Row
                    key={transaction._id}
                    last={index === arr.length - 1}
                  >
                    <CustomTable.Data body={transaction.productDetails.name} />
                    <CustomTable.Data
                      body={
                        <span
                          className={`badge p-badge fw-semibold fs-075rem ${
                            transaction.transactionType === "sell"
                              ? "bg-hov-color"
                              : "text-bg-dark"
                          }`}
                        >
                          {transaction.transactionType === "sell"
                            ? "بيع"
                            : "اضافة"}
                        </span>
                      }
                    />
                    <CustomTable.Data body={transaction.productDetails.code} />
                    <CustomTable.Data body={transaction.productDetails.brand} />
                    <CustomTable.Data body={transaction.quantity} />
                    <CustomTable.Data body={transaction.price} />
                    <CustomTable.Data body={transaction.customerDetails.name} />
                    <CustomTable.Data
                      body={convertDateFormat(transaction.createdAt)}
                      last
                    />
                  </CustomTable.Row>
                ))}
              </tbody>
            </CustomTable>
          </TableContainer>
        </>
      ) : (
        <TableContainer>
          <div className="p-4 text-center fs-small fw-medium">
            لا توجد بيانات
          </div>
        </TableContainer>
      )}
    </>
  );
}

export default ItemDetails;
