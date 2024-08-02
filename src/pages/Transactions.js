import { fetchTransactions } from "../features/transactionsSlice";
import convertDateFormat from "../utils/convertDateFormat";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: transactions,
    error,
    loading,
  } = useFetch(fetchTransactions, "transactions");

  const filterProducts = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <PageHeader>حركة الاصناف</PageHeader>
      <SearchInput
        name="transactionsFilter"
        placeholder="يمكنك البحث عن الصنف بالإسم"
        onChange={filterProducts}
      />
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
              {transactions.map((transaction, index, arr) =>
                transaction.products.map(
                  (product, i, a) =>
                    product.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) && (
                      <CustomTable.Row
                        key={product._id}
                        last={index === arr.length - 1 && i === a.length - 1}
                      >
                        <CustomTable.Data body={product.name} />
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
                        <CustomTable.Data body={product.code} />
                        <CustomTable.Data body={product.brand} />
                        <CustomTable.Data body={product.quantity} />
                        <CustomTable.Data body={product.price} />
                        <CustomTable.Data
                          body={transaction.customerDetails.name}
                        />
                        <CustomTable.Data
                          body={convertDateFormat(transaction.createdAt)}
                          last
                        />
                      </CustomTable.Row>
                    )
                )
              )}
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
