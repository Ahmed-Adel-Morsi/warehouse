import { actionsSvg, productTransactionsSvg } from "../svgs/actionsSVGs";
import { deleteCustomer } from "../features/customersSlice";
import AddandEditCustomer from "../components/modals/AddandEditCustomer";
import { Row, Data } from "../components/CustomTable";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import RemoveItem from "../components/modals/RemoveItem";
import useSearch from "../hooks/useSearch";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TableSection from "../components/TableSection";

function Customers() {
  const { loading, error, data: customers } = useSelector((state) => state.customers);
  const { filteredData: filteredCustomers, filterItems } = useSearch(
    customers,
    ["name", "code"]
  );

  return (
    <>
      <PageHeader>العملاء</PageHeader>

      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <SearchInput
          name="customersFilter"
          placeholder="يمكنك البحث عن العميل بالإسم والكود"
          onChange={filterItems}
        />
        <AddandEditCustomer />
      </div>

      <TableSection
        loading={loading}
        error={error}
        dataLength={filteredCustomers.length}
        pageName="customers"
      >
        {filteredCustomers.map((customer, index, arr) => (
          <Row key={customer._id} last={index === arr.length - 1}>
            <Data body={customer.name} />
            <Data body={customer.code} />
            <Data body={customer.phoneNumber} />
            <Data body={customer.address} />
            <Data
              body={
                <div className="dropdown-center position-static d-flex justify-content-center">
                  <button
                    type="button"
                    className="list-group-item list-group-item-action gap-2 fs-small w-2rem h-2rem rounded btn-hov"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {actionsSvg}
                  </button>
                  <ul className="dropdown-menu position-absolute p-1">
                    <li className="text-end p-2 fw-semibold">إجراءات</li>
                    <hr className="my-1" />
                    <li>
                      <AddandEditCustomer forEdit initialFormData={customer} />
                    </li>
                    <li>
                      <RemoveItem
                        title="حذف العميل"
                        description="هل انت متاكد؟ سيتم حذف العميل نهائياً"
                        confirmBtnTitle="حذف العميل"
                        handler={deleteCustomer}
                        itemIdToRemove={customer._id}
                      />
                    </li>
                    <li>
                      <Link
                        to={`${customer._id}`}
                        className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
                      >
                        {productTransactionsSvg}
                        حركة العميل
                      </Link>
                    </li>
                  </ul>
                </div>
              }
              last
            />
          </Row>
        ))}
      </TableSection>
    </>
  );
}

export default Customers;
