import { useParams } from "react-router-dom";
import { getTransactionsByProductId } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../utils/convertDateFormat";
import PageHeader from "../components/PageHeader";
import MainButton from "../components/MainButton";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import useFetch from "../hooks/useFetch";
import handlePrint from "../utils/handlePrint";

function ProductsMovements() {
  const { productId } = useParams();
  const {
    data: transactions,
    error,
    loading,
  } = useFetch(getTransactionsByProductId, "transactions", productId);

  return (
    <>
      <PageHeader>
        حركة الصنف
        {!loading && !error && transactions.length > 0
          ? ` - ${
              transactions[0].products.find(
                (product) => product._id === productId
              )?.name
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
                {transactions.map((transaction, index, arr) =>
                  transaction.products.map(
                    (product) =>
                      product._id === productId && (
                        <CustomTable.Row
                          key={transaction._id}
                          last={index === arr.length - 1}
                        >
                          <CustomTable.Data body={product.name} />
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

export default ProductsMovements;
