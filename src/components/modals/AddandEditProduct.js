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
  forEdit,
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
                invalidFeedback={fieldErrors.name}
                required
              />
              <ModalInput
                type="text"
                name="code"
                label="الكود"
                value={formData.code}
                onChange={handleChange}
                invalidFeedback={fieldErrors.code}
                required
                disabled={forEdit}
              />
              <ModalInput
                type="text"
                name="quantity"
                label="العدد"
                value={formData.quantity}
                onChange={handleChange}
                invalidFeedback={fieldErrors.quantity}
                disabled={forEdit}
              />
              <ModalInput
                type="text"
                name="price"
                label="السعر"
                value={formData.price}
                onChange={handleChange}
                invalidFeedback={fieldErrors.price}
              />
              <ModalInput
                type="text"
                name="brand"
                label="الماركة"
                value={formData.brand}
                onChange={handleChange}
                invalidFeedback={fieldErrors.brand}
              />
              <ModalInput
                type="text"
                name="countryOfOrigin"
                label="بلد المنشـأ"
                value={formData.countryOfOrigin}
                onChange={handleChange}
                invalidFeedback={fieldErrors.countryOfOrigin}
              />
              <ModalInput
                type="text"
                name="location"
                label="المكان"
                value={formData.location}
                onChange={handleChange}
                invalidFeedback={fieldErrors.location}
              />
              <ModalInput
                type="text"
                name="color"
                label="اللون"
                value={formData.color}
                onChange={handleChange}
                invalidFeedback={fieldErrors.color}
              />
              <ModalInput
                type="text"
                name="size"
                label="الحجم"
                value={formData.size}
                onChange={handleChange}
                invalidFeedback={fieldErrors.size}
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
