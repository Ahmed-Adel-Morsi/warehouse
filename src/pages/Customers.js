import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../features/customersSlice";
import { actionsSvg, productTransactionsSvg } from "../svgs/actionsSVGs";
import { deleteCustomer } from "../features/customersSlice";
import AddandEditCustomer from "../components/modals/AddandEditCustomer";
import DangerPopup from "../components/modals/DangerPopup";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";

function Customers() {
  const {
    data: customers,
    loading,
    error,
  } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const filterItems = (e) => {
    const value = e.target.value;
    setFilteredCustomers(
      customers.filter((customer) => {
        const codeAndName = `${customer.name} ${customer.code}`.toLowerCase();
        return codeAndName.includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCustomers()).unwrap();
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

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
            <p>Error: {error}</p>
          </div>
        ) : filteredCustomers.length > 0 ? (
          <CustomTable>
            <thead>
              <CustomTable.Row header={true}>
                <CustomTable.Data body="اسم العميل" />
                <CustomTable.Data body="كود العميل" />
                <CustomTable.Data body="رقم الهاتف" />
                <CustomTable.Data body="عنوان العميل" />
                <CustomTable.Data body="إجراءات" last={true} />
              </CustomTable.Row>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index, arr) => (
                <CustomTable.Row
                  key={customer.id}
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
                              forEdit={true}
                              initialFormData={customer}
                            />
                          </li>
                          <li>
                            <DangerPopup
                              buttonTitle="حذف"
                              title="حذف العميل"
                              itemToRemove={customer}
                              handler={deleteCustomer}
                              description="هل انت متاكد؟ سيتم حذف العميل نهائياً"
                              submitBtnTitle="حذف العميل"
                            />
                          </li>
                          <li>
                            <button className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium">
                              {productTransactionsSvg}
                              حركة العميل
                            </button>
                          </li>
                        </ul>
                      </div>
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

export default Customers;
