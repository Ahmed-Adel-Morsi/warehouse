import { addProductSvg } from "../../svgs/pageContentSVGs";
import CustomModal from "../CustomModal";
import { addProduct, editProduct } from "../../features/productsSlice";
import { useEffect } from "react";
import ModalInput from "../CustomInput";
import { editSvg } from "../../svgs/actionsSVGs";
import useForm from "../../hooks/useForm";
import DropdownSmallButton from "../DropdownSmallButton";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import useModal from "../../hooks/useModal";

function AddandEditProduct({
  forEdit = false,
  initialFormData = {
    name: "",
    code: "",
    brand: "",
    size: "",
    color: "",
    location: "",
    countryOfOrigin: "",
    quantity: "",
    price: "",
  },
  btnTitle = "إضافة صنف",
}) {
  const { show, handleClose, handleShow } = useModal();

  const {
    formData,
    setFormData,
    fieldErrors,
    loading,
    handleChange,
    handleSubmit,
  } = useForm(initialFormData, forEdit ? editProduct : addProduct, handleClose);

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
          btnIcon={addProductSvg}
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
              forEdit ? `تعديل الصنف | ${initialFormData.name}` : "إضافة صنف"
            }
            description={
              forEdit
                ? "يجب عليك ملء الخانات المراد تعديلها"
                : "يجب عليك ملء اسم الصنف و الكود اولاً لأضافة صنف جديد"
            }
          />
          <CustomModal.Body>
            <CustomForm
              id={forEdit ? "editProduct" : "addProduct"}
              onSubmit={handleSubmit}
            >
              <ModalInput
                type="text"
                name="name"
                label="اسم الصنف"
                value={formData.name}
                onChange={handleChange}
                isInvalid={fieldErrors.name}
                invalidFeedback={fieldErrors.name ? fieldErrors.name : ""}
                required
              />
              <ModalInput
                type="text"
                name="code"
                label="الكود"
                value={formData.code}
                onChange={handleChange}
                isInvalid={fieldErrors.code}
                invalidFeedback={fieldErrors.code ? fieldErrors.code : ""}
                required
                disabled={forEdit}
              />
              <ModalInput
                type="text"
                name="quantity"
                label="العدد"
                value={formData.quantity}
                onChange={handleChange}
                isInvalid={fieldErrors.quantity}
                invalidFeedback={
                  fieldErrors.quantity ? fieldErrors.quantity : ""
                }
                disabled={forEdit}
              />
              <ModalInput
                type="text"
                name="price"
                label="السعر"
                value={formData.price}
                onChange={handleChange}
                isInvalid={fieldErrors.price}
                invalidFeedback={fieldErrors.price ? fieldErrors.price : ""}
              />
              <ModalInput
                type="text"
                name="brand"
                label="الماركة"
                value={formData.brand}
                onChange={handleChange}
                isInvalid={fieldErrors.brand}
                invalidFeedback={fieldErrors.brand ? fieldErrors.brand : ""}
              />
              <ModalInput
                type="text"
                name="countryOfOrigin"
                label="بلد المنشـأ"
                value={formData.countryOfOrigin}
                onChange={handleChange}
                isInvalid={fieldErrors.countryOfOrigin}
                invalidFeedback={
                  fieldErrors.countryOfOrigin ? fieldErrors.countryOfOrigin : ""
                }
              />
              <ModalInput
                type="text"
                name="location"
                label="المكان"
                value={formData.location}
                onChange={handleChange}
                isInvalid={fieldErrors.location}
                invalidFeedback={
                  fieldErrors.location ? fieldErrors.location : ""
                }
              />
              <ModalInput
                type="text"
                name="color"
                label="اللون"
                value={formData.color}
                onChange={handleChange}
                isInvalid={fieldErrors.color}
                invalidFeedback={fieldErrors.color ? fieldErrors.color : ""}
              />
              <ModalInput
                type="text"
                name="size"
                label="الحجم"
                value={formData.size}
                onChange={handleChange}
                isInvalid={fieldErrors.size}
                invalidFeedback={fieldErrors.size ? fieldErrors.size : ""}
              />
            </CustomForm>
          </CustomModal.Body>
          <CustomModal.Footer
            formId={forEdit ? "editProduct" : "addProduct"}
            confirmBtnTitle={forEdit ? "تعديل" : "إضافة"}
            loadingState={loading}
          />
        </CustomModal>
      </Modal>
    </>
  );
}
export default AddandEditProduct;
