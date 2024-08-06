import { showInvoicesSvg } from "../svgs/actionsSVGs";
import { Link } from "react-router-dom";
import convertDateFormat from "../utils/convertDateFormat";
import { Row, Data } from "../components/CustomTable";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import useSearch from "../hooks/useSearch";
import { useSelector } from "react-redux";
import TableSection from "../components/TableSection";

function SoldInvoices() {
  const {
    loading,
    error,
    soldTransactions: transactions,
  } = useSelector((state) => state.transactions);
  const { filteredData: filteredTransactions, filterItems } = useSearch(
    transactions,
    ["invoiceNumber", ["customerDetails", "name"]]
  );

  return (
    <>
      <PageHeader>فواتير البيع</PageHeader>
      <SearchInput
        name="soldInvoicesFilter"
        placeholder="يمكنك البحث عن العميل بالإسم ورقم الفاتوره"
        onChange={filterItems}
      />
      <TableSection
        loading={loading}
        error={error}
        dataLength={filteredTransactions.length}
        pageName="soldInvoices"
      >
        {filteredTransactions.map((transaction, index, arr) => (
          <Row key={transaction._id} last={index === arr.length - 1}>
            <Data body={transaction.customerDetails.name} />
            <Data body={convertDateFormat(transaction.createdAt)} />
            <Data body={transaction.invoiceNumber} />
            <Data
              body={
                <Link
                  to={`${transaction.invoiceNumber}`}
                  title="عرض الفاتورة"
                  className="btn btn-hov"
                >
                  {showInvoicesSvg}
                </Link>
              }
              last
            />
          </Row>
        ))}
      </TableSection>
    </>
  );
}

export default SoldInvoices;
