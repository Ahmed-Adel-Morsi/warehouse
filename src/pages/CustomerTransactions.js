import { useParams } from "react-router-dom";
import { getCustomerTransactions } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../utils/convertDateFormat";
import PageHeader from "../components/PageHeader";
import MainButton from "../components/MainButton";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import handlePrint from "../utils/handlePrint";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function CustomerTransactions({ type }) {
  const { customerId } = useParams();
  const {
    loading,
    error,
    transactions: AllTransactions,
    customerTransactions: transactions,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerTransactions(customerId));
  }, [dispatch, customerId, AllTransactions]);

  return (
    <>
      <PageHeader>
        حركة {type === "customer" ? "العميل" : "المورد"}
        {!loading && !error && transactions.length > 0
          ? ` - ${transactions[0].customerDetails.name}`
          : ""}
      </PageHeader>

      {transactions.length > 0 && (
        <div className="d-flex flex-column flex-lg-row justify-content-end d-print-none">
          <MainButton
            btnIcon={printerSvg}
            clickHandler={handlePrint}
            btnTitle="طباعة"
          />
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
        ) : transactions.length > 0 ? (
          <>
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
                    key={`${transaction._id}${transaction.productDetails._id}`}
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
                    <CustomTable.Data
                      body={transaction.productDetails.quantity}
                    />
                    <CustomTable.Data body={transaction.productDetails.price} />
                    <CustomTable.Data body={transaction.customerDetails.name} />
                    <CustomTable.Data
                      body={convertDateFormat(transaction.createdAt)}
                      last
                    />
                  </CustomTable.Row>
                ))}
              </tbody>
            </CustomTable>
          </>
        ) : (
          <div className="p-4 text-center fs-small fw-medium">
            لا توجد بيانات
          </div>
        )}
      </TableContainer>
    </>
  );
}

export default CustomerTransactions;
