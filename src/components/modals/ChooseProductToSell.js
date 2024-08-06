import CustomModal from "../CustomModal";
import { productsSvg } from "../../svgs/sidebarSVGs";
import CustomInput from "../CustomInput";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import useModal from "../../hooks/useModal";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import transactionSchema from "../../schemas/transactionSchema";
import CustomSelect from "../CustomSelect";
import ChosenProductDetails from "../ChosenProductDetails";
import {
  addSoldPermissionOrder,
  setChosenProductToSell,
} from "../../features/soldPermissionSlice";

function ChooseProductToSell() {
  const { show, handleClose, handleShow } = useModal();
  const { loading, error, products } = useSelector((state) => state.products);
  const { soldPermissionOrderIds, chosenProductToSell } = useSelector(
    (state) => state.soldPermission
  );
  const soldPermissionSchema = transactionSchema(chosenProductToSell);
  const { formData, fieldErrors, handleChange, handleSubmit } = useForm(
    { quantity: "", price: "" },
    soldPermissionSchema,
    addSoldPermissionOrder,
    handleClose,
    undefined,
    true
  );
  const dispatch = useDispatch();

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
              <CustomSelect
                currentState={{ loading, error, data: products }}
                chosenItem={chosenProductToSell}
                setChosenItem={(currentChoice) =>
                  dispatch(setChosenProductToSell(currentChoice))
                }
                itemName="الصنف"
                excludedIds={soldPermissionOrderIds}
              />
              {chosenProductToSell && (
                <>
                  <ChosenProductDetails
                    quantity={chosenProductToSell.quantity}
                    price={chosenProductToSell.price}
                  />
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
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseProductToSell;
