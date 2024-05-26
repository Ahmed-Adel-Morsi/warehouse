import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../features/customersSlice";
import RemoveItemModal from "../components/modals/RemoveItemModal";
import AddCustomerModal from "../components/modals/customers/AddCustomerModal";
import EditCustomerModal from "../components/modals/customers/EditCustomerModal";
import {
  actionsSvg,
  productTransactionsSvg,
  removeSvg,
} from "../svgs/actionsSVGs";
import { deleteCustomer } from "../features/customersSlice";

function Customers() {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerToBeRemove, setCustomerToBeRemove] = useState();
  const [loading, setLoading] = useState(true);

  function filterItems(value) {
    setFilteredCustomers(
      customers.filter(function (customer) {
        const codeAndName = `${customer.name} ${customer.code}`.toLowerCase();
        return codeAndName.includes(value.toString().toLowerCase());
      })
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchCustomers()).unwrap();
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  return (
    <>
      <h1 className="fw-boldest text-center text-lg-end mb-3 mb-md-5">
        العملاء
      </h1>
      <div className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
        <input
          type="search"
          name="addCustomer"
          className="form-control w-100 mb-3 mb-lg-0 search-input"
          onChange={(e) => {
            filterItems(e.target.value);
          }}
          placeholder="يمكنك البحث عن الصنف بالإسم والكود"
        />
        <AddCustomerModal title="إضافة عميل" />
      </div>
      <div className="border rounded mw-100 overflow-x-auto table-container">
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : filteredCustomers.length > 0 ? (
          <table className="table table-hover table-borderless m-0">
            <thead>
              <tr className="table-light border-bottom">
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  اسم العميل
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  كود العميل
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  رقم الهاتف
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  عنوان العميل
                </td>
                <td className="fs-small fw-medium text-center align-middle p-3">
                  إجراءات
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index, arr) => (
                <tr
                  key={customer.id}
                  className={index !== arr.length - 1 ? "border-bottom" : ""}
                >
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {customer.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {customer.code || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {customer.phoneNumber || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {customer.address || "-"}
                  </td>
                  <td className="fs-small text-center align-middle p-1">
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
                          <EditCustomerModal customerToEdit={customer} />
                        </li>
                        <li>
                          <button
                            className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
                            data-bs-toggle="modal"
                            data-bs-target="#removeItemModal"
                            onClick={() => setCustomerToBeRemove(customer)}
                          >
                            {removeSvg}
                            حذف
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium">
                            {productTransactionsSvg}
                            حركة العميل
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center fs-small fw-medium">
            لا يوجد بيانات
          </div>
        )}
      </div>
      <RemoveItemModal
        itemToDelete={customerToBeRemove}
        deleteFunction={deleteCustomer}
        title="حذف العميل"
      >
        هل انت متاكد؟ سيتم حذف العميل نهائياً
      </RemoveItemModal>
    </>
  );
}

export default Customers;
