import { fetchCustomers } from "../features/customersSlice";
import { actionsSvg, productTransactionsSvg } from "../svgs/actionsSVGs";
import { deleteCustomer } from "../features/customersSlice";
import AddandEditCustomer from "../components/modals/AddandEditCustomer";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import RemoveItem from "../components/modals/RemoveItem";
import useFetch from "../hooks/useFetch";
import useSearch from "../hooks/useSearch";
import { Link } from "react-router-dom";

function Customers() {
  const {
    data: customers,
    error,
    loading,
  } = useFetch(fetchCustomers, "customers");
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
      <TableContainer>
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : error ? (
          <div className="p-4 text-center fs-small fw-medium">
            حدث خطأ ما
            <p>Error: {error.msg}</p>
          </div>
        ) : filteredCustomers.length > 0 ? (
          <CustomTable>
            <thead>
              <CustomTable.Row header>
                <CustomTable.Data body="اسم العميل" />
                <CustomTable.Data body="كود العميل" />
                <CustomTable.Data body="رقم الهاتف" />
                <CustomTable.Data body="عنوان العميل" />
                <CustomTable.Data body="إجراءات" last />
              </CustomTable.Row>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index, arr) => (
                <CustomTable.Row
                  key={customer._id}
                  last={index === arr.length - 1}
                >
                  <CustomTable.Data body={customer.name} />
                  <CustomTable.Data body={customer.code} />
                  <CustomTable.Data body={customer.phoneNumber} />
                  <CustomTable.Data body={customer.address} />
                  <CustomTable.Data
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
                            <AddandEditCustomer
                              forEdit
                              initialFormData={customer}
                            />
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

export default Customers;
