import convertDateFormat from "../utils/convertDateFormat";
import { Row, Data } from "../components/CustomTable";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import useSearch from "../hooks/useSearch";
import { useSelector } from "react-redux";
import TableSection from "../components/TableSection";

function Transactions() {
  const {
    loading,
    error,
    detailedTransactions: transactions,
  } = useSelector((state) => state.transactions);
  const { filteredData: filteredTransactions, filterItems } = useSearch(
    transactions,
    [["productDetails", "name"]]
  );

  return (
    <>
      <PageHeader>حركة الاصناف</PageHeader>
      <SearchInput
        name="transactionsFilter"
        placeholder="يمكنك البحث عن الصنف بالإسم"
        onChange={filterItems}
      />
      <TableSection
        loading={loading}
        error={error}
        dataLength={filteredTransactions.length}
        pageName="transactions"
      >
        {filteredTransactions.map((transaction, i, a) => (
          <Row
            key={`${transaction._id}${transaction.productDetails._id}`}
            last={i === a.length - 1}
          >
            <Data body={transaction.productDetails.name} />
            <Data
              body={
                <span
                  className={`badge p-badge fw-semibold fs-075rem ${
                    transaction.transactionType === "sell"
                      ? "text-bg-dark"
                      : "bg-hov-color"
                  }`}
                >
                  {transaction.transactionType === "sell" ? "إضافة" : "بيع"}
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

export default Transactions;
