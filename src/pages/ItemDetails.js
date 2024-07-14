import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTransactionsByProductId } from "../features/transactionsSlice";
import { printerSvg } from "../svgs/pageContentSVGs";
import convertDateFormat from "../utils/convertDateFormat";
import PageHeader from "../components/PageHeader";
import { Spinner } from "react-bootstrap";
import MainButton from "../components/MainButton";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";

function ItemDetails() {
  const { productId } = useParams();
  const {
    transactionsByProductId: transactions,
    error,
    loading,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    dispatch(getTransactionsByProductId(productId));
  }, [dispatch, productId]);
  return (
    <>
      <PageHeader>
        حركة الصنف -{" "}
        {!loading && !error && transactions.length > 0
          ? transactions[0].productDetails.name
          : "لا يوجد"}
      </PageHeader>
      {loading ? (
        <div className="p-4 text-center fs-small fw-medium">
          <Spinner animation="border" size="sm" />
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
                {transactions.map(
                  (transaction, index, arr) =>
                    transaction.productDetails.id === productId && (
                      <CustomTable.Row
                        key={transaction.id}
                        last={index === arr.length - 1}
                      >
                        <CustomTable.Data
                          body={transaction.productDetails.name}
                        />
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
                        <CustomTable.Data
                          body={transaction.productDetails.code}
                        />
                        <CustomTable.Data
                          body={transaction.productDetails.brand}
                        />
                        <CustomTable.Data body={transaction.quantity} />
                        <CustomTable.Data body={transaction.price} />
                        <CustomTable.Data
                          body={transaction.customerDetails.name}
                        />
                        <CustomTable.Data
                          body={convertDateFormat(transaction.createdAt)}
                          last={true}
                        />
                      </CustomTable.Row>
                    )
                )}
              </tbody>
            </CustomTable>
          </TableContainer>
        </>
      ) : (
        <div className="p-4 text-center fs-small fw-medium">لا يوجد بيانات</div>
      )}
    </>
  );
}

export default ItemDetails;
