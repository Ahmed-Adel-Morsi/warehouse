import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import CustomForm from "../CustomForm";
import { selectTogglerSvg } from "../../svgs/pageContentSVGs";
import { fetchProducts } from "../../features/productsSlice";
import { productsSvg } from "../../svgs/sidebarSVGs";
import ModalInput from "../CustomInput";
import useFetch from "../../hooks/useFetch";
import { Modal } from "react-bootstrap";
import MainButton from "../MainButton";
import { toastFire } from "../../utils/toastFire";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";

function ChooseProductToBuy({
  setChosenProductToBuy,
  chosenProductToBuy,
  setAdditionPermissionOrders,
  ordersIds,
}) {
  const [currentChoice, setCurrentChoice] = useState({});
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { show, handleClose, handleShow } = useModal();
  const {
    data: products,
    error,
    loading: fetchLoading,
  } = useFetch(fetchProducts, "products");
  const { filteredData: filteredProducts, filterItems } = useSearch(products, [
    "name",
  ]);

  const handleDropdownChoice = (e, product) => {
    e.preventDefault();
    document.querySelectorAll(".dropdown .dropdown-item").forEach((e) => {
      e.classList.remove("selected-item");
    });
    e.target.classList.add("selected-item");
    document.getElementById("dropdownMenuButton1").firstChild.textContent =
      product.name;
    setCurrentChoice(product);
    setChosenProductToBuy(product);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "quantity" || name === "price") {
      if (!value) {
        error = name === "quantity" ? "يجب إدخال العدد" : "يجب إدخال السعر";
      } else if (isNaN(value)) {
        error = "يجب إدخال ارقام فقط";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quantityError = validateField("quantity", formData.quantity);
    const priceError = validateField("price", formData.price);

    if (quantityError || priceError) {
      setErrors({
        quantity: quantityError,
        price: priceError,
      });
      return;
    }

    setLoading(true);
    setAdditionPermissionOrders((prevProducts) => [
      ...prevProducts,
      {
        ...formData,
        totalPrice: parseInt(formData.quantity) * parseFloat(formData.price),
        productDetails: currentChoice,
      },
    ]);
    handleClose();
    toastFire("success", `تم اختيار الصنف ${currentChoice.name} بنجاح`);
    setChosenProductToBuy(null);
    setLoading(false);
  };

  useEffect(() => {
    if (chosenProductToBuy) {
      setCurrentChoice(chosenProductToBuy);
    }
  }, [chosenProductToBuy]);

  return (
    <>
      <MainButton
        btnTitle="اختر الصنف"
        btnIcon={productsSvg}
        clickHandler={handleShow}
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <CustomModal handleClose={handleClose}>
          <CustomModal.Header
            title="اختر الصنف"
            description="يرجي اختيار الصنف من فضلك"
          />
          <CustomModal.Body>
            <CustomForm id="chooseProductToBuy" onSubmit={handleSubmit}>
              <div className="dropdown dropdown-center w-100">
                <button
                  className="btn border w-100 d-flex justify-content-between align-items-center btn-hov"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {chosenProductToBuy ? chosenProductToBuy.name : "اختر الصنف"}
                  {selectTogglerSvg}
                </button>
                <ul
                  className="dropdown-menu pt-0 position-fixed overflow-hidden"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <input
                    type="text"
                    className="form-control border-0 border-bottom rounded-0 shadow-none mb-2 no-outline search-input pe-30px"
                    placeholder="ابحث عن الصنف بالإسم"
                    onInput={filterItems}
                  />
                  {fetchLoading ? (
                    <div className="p-4 text-center fs-small fw-medium">
                      جارى التحميل...
                    </div>
                  ) : error ? (
                    <div className="p-4 text-center fs-small fw-medium">
                      حدث خطأ ما
                      <p>Error: {error.msg}</p>
                    </div>
                  ) : (
                    <div className="overflow-y-auto mh-6rem sm-scroll">
                      {filteredProducts.map(
                        (product) =>
                          !ordersIds.includes(product._id) && (
                            <li className="text-end" key={product._id}>
                              <a
                                className={`dropdown-item rounded py-1 pe-30px btn-hov ${
                                  chosenProductToBuy &&
                                  chosenProductToBuy.name === product.name
                                    ? "selected-item"
                                    : ""
                                }`}
                                href="/"
                                onClick={(e) =>
                                  handleDropdownChoice(e, product)
                                }
                              >
                                {product.name}
                              </a>
                            </li>
                          )
                      )}
                    </div>
                  )}
                </ul>
              </div>
              {chosenProductToBuy && (
                <>
                  <div className="d-flex gap-3 text-muted">
                    <p className="mb-0">
                      العدد بالمخزن : {chosenProductToBuy.quantity || 0}
                    </p>
                    <p className="mb-0">
                      السعر بالمخزن : {chosenProductToBuy.price || 0}
                    </p>
                  </div>
                  <>
                    <ModalInput
                      type="text"
                      name="quantity"
                      label="العدد"
                      isInvalid={errors.quantity}
                      invalidFeedback={errors.quantity}
                      onChange={handleChange}
                      required
                    />
                    <ModalInput
                      type="text"
                      name="price"
                      label="سعر الوحدة"
                      isInvalid={errors.price}
                      invalidFeedback={errors.price}
                      onChange={handleChange}
                      required
                    />
                  </>
                </>
              )}
            </CustomForm>
          </CustomModal.Body>
          <CustomModal.Footer
            confirmBtnTitle="اضافة"
            formId="chooseProductToBuy"
            disableConfirmBtn={!chosenProductToBuy}
            loadingState={loading}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseProductToBuy;
