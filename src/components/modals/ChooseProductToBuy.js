import CustomModal from "../CustomModal";
import CustomForm from "../CustomForm";
import { productsSvg } from "../../svgs/sidebarSVGs";
import CustomInput from "../CustomInput";
import { Modal } from "react-bootstrap";
import MainButton from "../MainButton";
import useModal from "../../hooks/useModal";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import transactionSchema from "../../schemas/transactionSchema";
import CustomSelect from "../CustomSelect";
import ChosenProductDetails from "../ChosenProductDetails";
import {
  addAdditionPermissionOrder,
  setChosenProductToBuy,
} from "../../features/addPermissionSlice";

function ChooseProductToBuy() {
  const { show, handleClose, handleShow } = useModal();
  const { loading, error, products } = useSelector((state) => state.products);
  const { addPermissionOrderIds, chosenProductToBuy } = useSelector(
    (state) => state.addPermission
  );
  const addPermissionSchema = transactionSchema();
  const { formData, fieldErrors, handleChange, handleSubmit } = useForm(
    { quantity: "", price: "" },
    addPermissionSchema,
    addAdditionPermissionOrder,
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
            <CustomForm id="chooseProductToBuy" onSubmit={handleSubmit}>
              <CustomSelect
                currentState={{ loading, error, data: products }}
                chosenItem={chosenProductToBuy}
                setChosenItem={(currentChoice) =>
                  dispatch(setChosenProductToBuy(currentChoice))
                }
                itemName="الصنف"
                excludedIds={addPermissionOrderIds}
              />
              {chosenProductToBuy && (
                <>
                  <ChosenProductDetails
                    quantity={chosenProductToBuy.quantity}
                    price={chosenProductToBuy.price}
                  />
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
              )}
            </CustomForm>
          </CustomModal.Body>
          <CustomModal.Footer
            confirmBtnTitle="اضافة"
            formId="chooseProductToBuy"
            disableConfirmBtn={!chosenProductToBuy}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseProductToBuy;
