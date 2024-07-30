import { fetchTransactions } from "../features/transactionsSlice";
import convertDateFormat from "../utils/convertDateFormat";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import useFetch from "../hooks/useFetch";
import useSearch from "../hooks/useSearch";

function Transactions() {
  const {
    data: transactions,
    error,
    loading,
  } = useFetch(fetchTransactions, "transactions");
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
      <TableContainer>
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : error ? (
          <div className="p-4 text-center fs-small fw-medium">
            حدث خطأ ما
            <p>Error: {error}</p>
          </div>
        ) : filteredTransactions.length > 0 ? (
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
              {filteredTransactions.map((transaction, index, arr) => (
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
                            ? "text-bg-dark"
                            : "bg-hov-color"
                        }`}
                      >
                        {transaction.transactionType === "sell"
                          ? "إضافة"
                          : "بيع"}
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
        ) : (
          <div className="p-4 text-center fs-small fw-medium">
            لا يوجد بيانات
          </div>
        )}
      </TableContainer>
    </>
  );
}

export default Transactions;
