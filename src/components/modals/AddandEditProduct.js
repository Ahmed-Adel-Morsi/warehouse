import { useDispatch } from "react-redux";
import { addProductSvg } from "../../svgs/pageContentSVGs";
import CustomModal from "../CustomModal";
import { addProduct, editProduct } from "../../features/productsSlice";
import { useState } from "react";
import ModalInput from "../CustomInput";
import { editSvg } from "../../svgs/actionsSVGs";

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
}) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    if (isFieldValid(e)) {
      e.target.removeAttribute("required");
      e.target.classList.remove("is-invalid");
      e.target.setCustomValidity("");
    } else {
      e.target.required = true;
      e.target.classList.add("is-invalid");
      e.target.setCustomValidity("Invalid field.");
    }
  };

  const handleSubmit = (e) => {
    if (e.currentTarget.checkValidity()) {
      dispatch(forEdit ? editProduct(formData) : addProduct(formData));
      setFormData(initialFormData);
      return true;
    }
    return false;
  };

  const isFieldValid = (e) => {
    let value = e.target.value;

    switch (e.target.name) {
      case "code":
      case "name":
        return value !== "";

      case "quantity":
      case "size":
        return value !== "" ? !isNaN(parseInt(value)) : true;

      case "price":
        return value !== "" ? !isNaN(parseFloat(value)) : true;

      default:
        return true;
    }
  };

  return (
    <CustomModal
      btnTitle={forEdit ? "تعديل" : "إضافة صنف"}
      btnIcon={forEdit ? editSvg : addProductSvg}
      modalFor={forEdit ? "edit" : false}
    >
      <CustomModal.Header
        title={forEdit ? `تعديل الصنف | ${initialFormData.name}` : "إضافة صنف"}
      >
        {forEdit
          ? "يجب عليك ملء الخانات المراد تعديلها"
          : "يجب عليك ملء اسم الصنف و الكود اولاً لأضافة صنف جديد"}
      </CustomModal.Header>
      <CustomModal.Body
        btnTitle={forEdit ? "تعديل" : "إضافة"}
        submitHandler={handleSubmit}
        successMessage={`تم ${forEdit ? "تعديل" : "اضافة"} ${
          formData.name
        } بنجاح`}
      >
        <ModalInput
          type="text"
          name="name"
          label="اسم الصنف"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          invalidFeedback="يجب إدخال اسم الصنف"
          required
        />
        <ModalInput
          type="text"
          name="code"
          label="الكود"
          value={formData.code}
          onChange={handleChange}
          onBlur={handleBlur}
          invalidFeedback="يجب إدخال الكود"
          required
          disabled={forEdit}
        />
        <ModalInput
          type="text"
          name="quantity"
          label="العدد"
          value={formData.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          invalidFeedback="يجب إدخال ارقام فقط"
          disabled={forEdit}
        />
        <ModalInput
          type="text"
          name="price"
          label="السعر"
          value={formData.price}
          onChange={handleChange}
          onBlur={handleBlur}
          invalidFeedback="يجب إدخال ارقام فقط"
        />
        <ModalInput
          type="text"
          name="brand"
          label="الماركة"
          value={formData.brand}
          onChange={handleChange}
        />
        <ModalInput
          type="text"
          name="countryOfOrigin"
          label="بلد المنشـأ"
          value={formData.countryOfOrigin}
          onChange={handleChange}
        />
        <ModalInput
          type="text"
          name="location"
          label="المكان"
          value={formData.location}
          onChange={handleChange}
        />
        <ModalInput
          type="text"
          name="color"
          label="اللون"
          value={formData.color}
          onChange={handleChange}
        />
        <ModalInput
          type="text"
          name="size"
          label="الحجم"
          value={formData.size}
          onChange={handleChange}
          onBlur={handleBlur}
          invalidFeedback="يجب إدخال ارقام فقط"
        />
      </CustomModal.Body>
    </CustomModal>
  );
}
export default AddandEditProduct;
