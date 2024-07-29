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
import { addVendor, editVendor } from "../../features/vendorsSlice";
import useModal from "../../hooks/useModal";

function AddandEditVendor({
  forEdit = false,
  initialFormData = {
    name: "",
    phoneNumber: "",
    address: "",
  },
  btnTitle = "إضافة مورد",
}) {
  const { show, handleClose, handleShow } = useModal();

  const {
    formData,
    setFormData,
    fieldErrors,
    loading,
    handleChange,
    handleSubmit,
  } = useForm(initialFormData, forEdit ? editVendor : addVendor, handleClose);

  useEffect(() => {
    if (forEdit && initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData, forEdit, setFormData]);

  return (
    <>
      {forEdit ? (
        <DropdownSmallButton
          btnIcon={editSvg}
          btnTitle="تعديل"
          clickHandler={handleShow}
        />
      ) : (
        <MainButton
          btnIcon={addCustomerSvg}
          clickHandler={handleShow}
          btnTitle={btnTitle}
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
                ? `تعديل بيانات المورد | ${initialFormData.name}`
                : "إضافة مورد"
            }
            description={
              forEdit
                ? "يجب عليك ملء الخانات المراد تعديلها"
                : "يجب عليك ملء اسم المورد اولاً لأضافة مورد جديد"
            }
          />
          <CustomModal.Body>
            <CustomForm
              id={forEdit ? "editVendor" : "addVendor"}
              onSubmit={handleSubmit}
            >
              <ModalInput
                type="text"
                name="name"
                label="اسم المورد"
                value={formData.name}
                onChange={handleChange}
                isInvalid={fieldErrors.name}
                invalidFeedback={fieldErrors.name ? fieldErrors.name : ""}
                required
                disabled={forEdit}
              />
              <ModalInput
                type="text"
                name="phoneNumber"
                label="رقم الهاتف"
                value={formData.phoneNumber}
                onChange={handleChange}
                isInvalid={fieldErrors.phoneNumber}
                invalidFeedback={
                  fieldErrors.phoneNumber ? fieldErrors.phoneNumber : ""
                }
              />
              <ModalInput
                type="text"
                name="address"
                label="عنوان المورد"
                value={formData.address}
                onChange={handleChange}
                isInvalid={fieldErrors.address}
                invalidFeedback={fieldErrors.address ? fieldErrors.address : ""}
              />
            </CustomForm>
          </CustomModal.Body>
          <CustomModal.Footer
            formId={forEdit ? "editVendor" : "addVendor"}
            confirmBtnTitle={forEdit ? "تعديل" : "إضافة"}
            loadingState={loading}
          />
        </CustomModal>
      </Modal>
    </>
  );
}
export default AddandEditVendor;
