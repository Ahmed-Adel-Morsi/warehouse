import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsOfType } from "../features/transactionsSlice";
import { showInvoicesSvg } from "../svgs/actionsSVGs";
import { Link } from "react-router-dom";
import convertDateFormat from "../utils/convertDateFormat";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";

function SoldInvoices() {
  const {
    filteredData: transactions,
    loading,
    error,
  } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const filterItems = (e) => {
    const value = e.target.value;
    setFilteredTransactions(
      transactions.filter(function (transaction) {
        return `${transaction.customerDetails.name} ${transaction.invoiceNumber}`
          .toLowerCase()
          .includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getTransactionsOfType("sell")).unwrap();
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
      <PageHeader>فواتير البيع</PageHeader>
      <SearchInput
        name="soldInvoicesFilter"
        placeholder="يمكنك البحث عن العميل بالإسم ورقم الفاتوره"
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
                <CustomTable.Data body="اسم العميل" />
                <CustomTable.Data body="التاريخ" />
                <CustomTable.Data body="رقم الفاتورة" />
                <CustomTable.Data body="إجراءات" last={true} />
              </CustomTable.Row>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index, arr) => (
                <CustomTable.Row
                  key={transaction._id}
                  last={index === arr.length - 1}
                >
                  <CustomTable.Data body={transaction.customerDetails.name} />
                  <CustomTable.Data
                    body={convertDateFormat(transaction.createdAt)}
                  />
                  <CustomTable.Data body={transaction.invoiceNumber} />
                  <CustomTable.Data
                    body={
                      <Link
                        to={`${transaction.invoiceNumber}`}
                        title="عرض الفاتورة"
                        className="btn btn-hov"
                      >
                        {showInvoicesSvg}
                      </Link>
                    }
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

export default SoldInvoices;
