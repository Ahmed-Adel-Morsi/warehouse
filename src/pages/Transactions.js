import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transactionsSlice";
import convertDateFormat from "../elements/convertDateFormat";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";

function Transactions() {
  const {
    data: transactions,
    loading,
    error,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const filterItems = (e) => {
    const value = e.target.value;
    setFilteredTransactions(
      transactions.filter(function (transaction) {
        return transaction.productDetails.name
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTransactions()).unwrap();
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

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
              <CustomTable.Row header={true}>
                <CustomTable.Data body="اسم الصنف" />
                <CustomTable.Data body="حركة الصنف" />
                <CustomTable.Data body="الكود" />
                <CustomTable.Data body="الماركة" />
                <CustomTable.Data body="العدد" />
                <CustomTable.Data body="السعر" />
                <CustomTable.Data body="العميل" />
                <CustomTable.Data body="التاريخ" last={true} />
              </CustomTable.Row>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index, arr) => (
                <CustomTable.Row
                  key={transaction.id}
                  last={index === arr.length - 1}
                >
                  <CustomTable.Data body={transaction.productDetails.name} />
                  <CustomTable.Data
                    body={
                      <span
                        className={`badge p-badge fw-semibold fs-075rem ${
                          transaction.transactionType === "sell"
                            ? "text-bg-light"
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
                    last={true}
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
