import CustomModal from "../CustomModal";
import { selectTogglerSvg } from "../../svgs/pageContentSVGs";
import { fetchProducts } from "../../features/productsSlice";
import { productsSvg } from "../../svgs/sidebarSVGs";
import CustomInput from "../CustomInput";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import { toastFire } from "../../utils/toastFire";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import transactionSchema from "../../schemas/transactionSchema";
import {
  setSoldPermissionOrders,
  setChosenProductToSell,
} from "../../features/soldPermissionSlice";
import handleDropdownChoice from "../../utils/handleDropdownChoice";

function ChooseProductToSell() {
  const { show, handleClose, handleShow } = useModal();
  const {
    data: products,
    error,
    loading: fetchLoading,
  } = useFetch(fetchProducts, "products");

  const { filteredData: filteredProducts, filterItems } = useSearch(products, [
    "name",
  ]);

  const { soldPermissionOrderIds, chosenProductToSell } = useSelector(
    (state) => state.soldPermission
  );

  const soldPermissionSchema = transactionSchema(chosenProductToSell);
  const dispatch = useDispatch();

  const { formData, fieldErrors, loading, handleChange, handleSubmit } =
    useForm(
      { quantity: "", price: "" },
      soldPermissionSchema,
      setSoldPermissionOrders,
      () => {
        handleClose();
        toastFire(
          "success",
          `تم اختيار الصنف ${chosenProductToSell.name} بنجاح`
        );
      },
      undefined,
      true
    );

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
            <CustomForm id="chooseProductToSell" onSubmit={handleSubmit}>
              <div className="dropdown dropdown-center w-100">
                <button
                  className="btn border w-100 d-flex justify-content-between align-items-center btn-hov"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {chosenProductToSell
                    ? chosenProductToSell.name
                    : "اختر الصنف"}
                  {selectTogglerSvg}
                </button>
                <ul
                  className="dropdown-menu pt-0 position-fixed overflow-hidden"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <input
                    type="text"
                    name="search"
                    className="form-control border-0 border-bottom rounded-0 shadow-none mb-2 no-outline search-input pe-30px"
                    placeholder="ابحث عن الصنف بالإسم"
                    onInput={filterItems}
                    autoComplete="off"
                  />
                  {fetchLoading ? (
                    <div className="p-4 text-center fs-small fw-medium">
                      جارى التحميل...
                    </div>
                  ) : error ? (
                    <div className="p-4 text-center fs-small fw-medium">
                      حدث خطأ ما:
                      <p>{error.message}</p>
                    </div>
                  ) : (
                    <div className="overflow-y-auto mh-6rem sm-scroll">
                      {filteredProducts.map(
                        (product) =>
                          !soldPermissionOrderIds.includes(product._id) && (
                            <li className="text-end" key={product._id}>
                              <a
                                className={`dropdown-item rounded py-1 pe-30px btn-hov ${
                                  chosenProductToSell &&
                                  chosenProductToSell.name === product.name
                                    ? "selected-item"
                                    : ""
                                }`}
                                href="/"
                                onClick={(e) =>
                                  handleDropdownChoice(e, product, () => {
                                    dispatch(setChosenProductToSell(product));
                                  })
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
              {chosenProductToSell && (
                <>
                  <div className="d-flex gap-3 text-muted">
                    <p className="mb-0">
                      العدد بالمخزن : {chosenProductToSell.quantity || 0}
                    </p>
                    <p className="mb-0">
                      السعر بالمخزن : {chosenProductToSell.price || 0}
                    </p>
                  </div>
                  {chosenProductToSell.quantity ? (
                    <>
                      <CustomInput
                        type="text"
                        name="quantity"
                        label="العدد"
                        value={formData.quantity}
                        invalidFeedback={fieldErrors.quantity}
                        onChange={handleChange}
                        required
                      />
                      <CustomInput
                        type="text"
                        name="price"
                        label="سعر الوحدة"
                        value={formData.price}
                        invalidFeedback={fieldErrors.price}
                        onChange={handleChange}
                        required
                      />
                    </>
                  ) : (
                    <p className="text-danger m-0 fs-small">
                      الصنف '{chosenProductToSell.name}' لا يوجد منه فى المخزن
                      لذلك لا يمكنك بيعه
                    </p>
                  )}
                </>
              )}
            </CustomForm>
          </CustomModal.Body>
          <CustomModal.Footer
            confirmBtnTitle="اضافة"
            formId="chooseProductToSell"
            disableConfirmBtn={!chosenProductToSell}
            loadingState={loading}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseProductToSell;
