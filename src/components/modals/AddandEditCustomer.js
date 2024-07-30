import DropdownSmallButton from "../DropdownSmallButton";
import CustomModal from "../CustomModal";
import useForm from "../../hooks/useForm";
import ModalInput from "../CustomInput";
import CustomForm from "../CustomForm";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import { editSvg } from "../../svgs/actionsSVGs";
import { addCustomerSvg } from "../../svgs/pageContentSVGs";
import { addCustomer, editCustomer } from "../../features/customersSlice";
import useModal from "../../hooks/useModal";

function AddandEditCustomer({
  forEdit,
  initialFormData = {
    name: "",
    phoneNumber: "",
    address: "",
  },
  btnTitle = "إضافة عميل",
}) {
  const { show, handleClose, handleShow } = useModal();

  const {
    formData,
    setFormData,
    fieldErrors,
    loading,
    handleChange,
    handleSubmit,
  } = useForm(
    initialFormData,
    forEdit ? editCustomer : addCustomer,
    handleClose
  );

  useEffect(() => {
    if (forEdit && initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData, forEdit, setFormData]);

  return (
    <>
      {forEdit ? (
        <DropdownSmallButton
          btnTitle="تعديل"
          btnIcon={editSvg}
          clickHandler={handleShow}
        />
      ) : (
        <MainButton
          btnTitle={btnTitle}
          btnIcon={addCustomerSvg}
          clickHandler={handleShow}
        />
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <CustomModal handleClose={handleClose}>
          <CustomModal.Header
            title={
              forEdit
                ? `تعديل بيانات العميل | ${initialFormData.name}`
                : "إضافة عميل"
            }
            description={
              forEdit
                ? "يجب عليك ملء الخانات المراد تعديلها"
                : "يجب عليك ملء اسم العميل اولاً لأضافة عميل جديد"
            }
          />
          <CustomModal.Body>
            <CustomForm
              id={forEdit ? "editCustomer" : "addCustomer"}
              onSubmit={handleSubmit}
            >
              <ModalInput
                type="text"
                name="name"
                label="اسم العميل"
                value={formData.name}
                onChange={handleChange}
                invalidFeedback={fieldErrors.name}
                required
                disabled={forEdit}
              />
              <ModalInput
                type="text"
                name="phoneNumber"
                label="رقم الهاتف"
                value={formData.phoneNumber}
                onChange={handleChange}
                invalidFeedback={fieldErrors.phoneNumber}
              />
              <ModalInput
                type="text"
                name="address"
                label="عنوان العميل"
                value={formData.address}
                onChange={handleChange}
                invalidFeedback={fieldErrors.address}
              />
            </CustomForm>
          </CustomModal.Body>
          <CustomModal.Footer
            formId={forEdit ? "editCustomer" : "addCustomer"}
            confirmBtnTitle={forEdit ? "تعديل" : "إضافة"}
            loadingState={loading}
          />
        </CustomModal>
      </Modal>
    </>
  );
}
export default AddandEditCustomer;
