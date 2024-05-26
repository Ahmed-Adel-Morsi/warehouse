import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../features/productsSlice";
import RemoveItemModal from "../components/modals/RemoveItemModal";
import { removeSvg } from "../svgs/actionsSVGs";
import AddCustomerModal from "../components/modals/customers/AddCustomerModal";
import { fetchCustomers } from "../features/customersSlice";
import { customersSvg } from "../svgs/sidebarSVGs";
import CustomModal from "../components/CustomModal";
import { selectTogglerSvg } from "../svgs/pageContentSVGs";

function SoldPermission() {
  const products = useSelector((state) => state.products);
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productToBeRemove, setProductToBeRemove] = useState();
  const [loading, setLoading] = useState(true);
  const [chosenCustomer, setChosenCustomer] = useState(null);
  const [currentChoice, setCurrentChoice] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCustomerChoice = () => {
    if (document.getElementById("hiddenInput").value) {
      setChosenCustomer(currentChoice);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchCustomers()).unwrap();
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customers, searchQuery]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <>
      <h1 className="fw-boldest text-center text-lg-end mb-3 mb-md-5">
        إذن بيع
      </h1>
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 fw-semibold">
        <div className="text-center text-md-end">
          {chosenCustomer
            ? `اسم العميل : ${chosenCustomer.name}`
            : "الرجاء اختيار العميل"}
        </div>
        <div className="d-flex gap-2 w-sm-100 flex-column flex-sm-row flex-grow-1 justify-content-end">
          <CustomModal btnTitle="اختر العميل" btnIcon={customersSvg}>
            <CustomModal.Header title="اختر العميل">
              يرجي اختيار العميل من فضلك
            </CustomModal.Header>
            <CustomModal.Body
              btnTitle="اضافة"
              submitHandler={handleCustomerChoice}
            >
              <div className="dropdown dropdown-center w-100">
                <button
                  className="btn border w-100 d-flex justify-content-between align-items-center"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  اختر العميل
                  {selectTogglerSvg}
                </button>
                <ul
                  className="dropdown-menu pt-0 position-fixed"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <input
                    type="text"
                    className="form-control border-0 border-bottom shadow-none mb-2 no-outline search-input"
                    placeholder="ابحث عن العميل بالإسم"
                    onInput={handleInput}
                  />
                  <input type="hidden" id="hiddenInput" required />
                  <div className="overflow-y-auto mh-6rem sm-scroll">
                    {filteredCustomers.map((customer) => (
                      <li key={customer.id}>
                        <a
                          className="dropdown-item"
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(
                              "dropdownMenuButton1"
                            ).textContent = customer.name;
                            document.getElementById("hiddenInput").value =
                              customer.name;
                            console.log(
                              document.getElementById("hiddenInput").value
                            );
                            setCurrentChoice(customer);
                          }}
                        >
                          {customer.name}
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </CustomModal.Body>
          </CustomModal>
          <AddCustomerModal title="إضافة عميل جديد" />
        </div>
      </div>
      <div className="border rounded mw-100 overflow-x-auto table-container">
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : filteredProducts.length > 0 ? (
          <table className="table table-hover table-borderless m-0">
            <thead>
              <tr className="table-light border-bottom">
                <td className="border-start fs-small fw-medium text-center p-3">
                  اسم الصنف
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  الكود
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  الماركة
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  الحجم
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  اللون
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  العدد
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  السعر
                </td>
                <td className="fs-small fw-medium text-center p-3">إجراءات</td>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index, arr) => (
                <tr
                  key={product.id}
                  className={index !== arr.length - 1 ? "border-bottom" : ""}
                >
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.code || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.brand || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.size || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.color || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.quantity || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.price || "-"}
                  </td>
                  <td className="fs-small h-100 d-flex justify-content-center p-3">
                    <button
                      type="button"
                      className="btn justify-content-center fs-small rounded btn-hov border-0 p-0"
                      data-bs-toggle="modal"
                      data-bs-target="#removeItemModal"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                      onClick={() => setProductToBeRemove(product)}
                    >
                      {removeSvg}
                    </button>
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
        itemToDelete={productToBeRemove}
        deleteFunction={deleteProduct}
        title="حذف الصنف"
      >
        هل انت متاكد؟ سيتم حذف الصنف نهائياً
      </RemoveItemModal>
    </>
  );
}

export default SoldPermission;
