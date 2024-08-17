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
import {
  addSoldPermissionOrder,
  setChosenProductToSell,
} from "../../features/soldPermissionSlice";

function ChooseProduct({ forSell }) {
  const { show, handleClose, handleShow } = useModal();
  const { loading, error, data } = useSelector((state) => state.products);
  const { addPermissionOrderIds, chosenProductToBuy } = useSelector(
    (state) => state.addPermission
  );
  const { soldPermissionOrderIds, chosenProductToSell } = useSelector(
    (state) => state.soldPermission
  );
  const schema = forSell
    ? transactionSchema(chosenProductToSell)
    : transactionSchema();
  const { formData, fieldErrors, handleChange, handleSubmit } = useForm(
    { quantity: "", price: "" },
    schema,
    forSell ? addSoldPermissionOrder : addAdditionPermissionOrder,
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
            <CustomForm
              id={forSell ? "chooseProductToSell" : "chooseProductToBuy"}
              onSubmit={handleSubmit}
            >
              <CustomSelect
                currentState={{ loading, error, data }}
                chosenItem={forSell ? chosenProductToSell : chosenProductToBuy}
                setChosenItem={(currentChoice) =>
                  dispatch(
                    forSell
                      ? setChosenProductToSell(currentChoice)
                      : setChosenProductToBuy(currentChoice)
                  )
                }
                itemName="الصنف"
                excludedIds={
                  forSell ? soldPermissionOrderIds : addPermissionOrderIds
                }
              />
              {((forSell && chosenProductToSell) ||
                (!forSell && chosenProductToBuy)) && (
                <>
                  <ChosenProductDetails
                    quantity={
                      forSell
                        ? chosenProductToSell.quantity
                        : chosenProductToBuy.quantity
                    }
                    price={
                      forSell
                        ? chosenProductToSell.price
                        : chosenProductToBuy.price
                    }
                  />
                  {(forSell && chosenProductToSell.quantity) || !forSell ? (
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
            formId={forSell ? "chooseProductToSell" : "chooseProductToBuy"}
            disableConfirmBtn={
              forSell ? !chosenProductToSell : !chosenProductToBuy
            }
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseProduct;
