import { useParams } from "react-router-dom";
import { getTransactionsByProductId } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../utils/convertDateFormat";
import PageHeader from "../components/PageHeader";
import MainButton from "../components/MainButton";
import { Row, Data } from "../components/CustomTable";
import handlePrint from "../utils/handlePrint";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TableSection from "../components/TableSection";

function ProductTransactions() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    transactions: AllTransactions,
    productTransactions: transactions,
  } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getTransactionsByProductId(productId));
  }, [dispatch, productId, AllTransactions]);

  return (
    <>
      <PageHeader>
        حركة الصنف
        {!loading && !error && transactions.length > 0
          ? ` - ${
              transactions.find(
                (transaction) => transaction.productDetails._id === productId
              )?.productDetails.name
            }`
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

      <TableSection
        loading={loading}
        error={error}
        dataLength={transactions.length}
        pageName="movements"
      >
        {transactions.map((transaction, index, arr) => (
          <Row key={transaction._id} last={index === arr.length - 1}>
            <Data body={transaction.productDetails.name} />
            <Data
              body={
                <span
                  className={`badge p-badge fw-semibold fs-075rem ${
                    transaction.transactionType === "sell"
                      ? "bg-hov-color"
                      : "text-bg-dark"
                  }`}
                >
                  {transaction.transactionType === "sell" ? "بيع" : "اضافة"}
                </span>
              }
            />
            <Data body={transaction.productDetails.code} />
            <Data body={transaction.productDetails.brand} />
            <Data body={transaction.productDetails.quantity} />
            <Data body={transaction.productDetails.price} />
            <Data body={transaction.customerDetails.name} />
            <Data body={convertDateFormat(transaction.createdAt)} last />
          </Row>
        ))}
      </TableSection>
    </>
  );
}

export default ProductTransactions;
