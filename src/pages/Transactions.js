import { fetchTransactions } from "../features/transactionsSlice";
import convertDateFormat from "../utils/convertDateFormat";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";

function Transactions() {
  const [products, setProducts] = useState([]);
  const { filteredData: filteredProducts, filterItems } = useSearch(products, [
    "name",
  ]);
  const {
    data: transactions,
    error,
    loading,
  } = useFetch(fetchTransactions, "transactions");

  useEffect(() => {
    if (transactions.length > 0) {
      const newProducts = [];
      transactions.forEach((transaction) => {
        transaction.products.forEach((product) => {
          newProducts.push({
            ...product,
            key: `${transaction._id}${product._id}`,
            transactionType: transaction.transactionType,
            customerName: transaction.customerDetails.name,
            transactionDate: transaction.createdAt,
          });
        });
      });
      setProducts(newProducts);
    } else {
      setProducts([]);
    }
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
            حدث خطأ ما:
            <p>{error.message}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
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
              {filteredProducts.map((product, i, a) => (
                <CustomTable.Row key={product.key} last={i === a.length - 1}>
                  <CustomTable.Data body={product.name} />
                  <CustomTable.Data
                    body={
                      <span
                        className={`badge p-badge fw-semibold fs-075rem ${
                          product.transactionType === "sell"
                            ? "text-bg-dark"
                            : "bg-hov-color"
                        }`}
                      >
                        {product.transactionType === "sell" ? "إضافة" : "بيع"}
                      </span>
                    }
                  />
                  <CustomTable.Data body={product.code} />
                  <CustomTable.Data body={product.brand} />
                  <CustomTable.Data body={product.quantity} />
                  <CustomTable.Data body={product.price} />
                  <CustomTable.Data body={product.customerName} />
                  <CustomTable.Data
                    body={convertDateFormat(product.transactionDate)}
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
