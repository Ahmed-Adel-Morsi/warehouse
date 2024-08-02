import DropdownSmallButton from "../DropdownSmallButton";
import CustomModal from "../CustomModal";
import useForm from "../../hooks/useForm";
import CustomInput from "../CustomInput";
import CustomForm from "../CustomForm";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import { editSvg } from "../../svgs/actionsSVGs";
import { addCustomerSvg } from "../../svgs/pageContentSVGs";
import { addVendor, editVendor } from "../../features/vendorsSlice";
import useModal from "../../hooks/useModal";
import customerSchema from "../../schemas/customerSchema";

function AddandEditVendor({
  forEdit,
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
  } = useForm(
    initialFormData,
    customerSchema,
    forEdit ? editVendor : addVendor,
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
              <CustomInput
                type="text"
                name="name"
                label="اسم المورد"
                value={formData.name}
                onChange={handleChange}
                invalidFeedback={fieldErrors.name}
                required
                disabled={forEdit}
              />
              <CustomInput
                type="text"
                name="phoneNumber"
                label="رقم الهاتف"
                value={formData.phoneNumber}
                onChange={handleChange}
                invalidFeedback={fieldErrors.phoneNumber}
              />
              <CustomInput
                type="text"
                name="address"
                label="عنوان المورد"
                value={formData.address}
                onChange={handleChange}
                invalidFeedback={fieldErrors.address}
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
