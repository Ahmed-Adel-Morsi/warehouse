import { useState } from "react";
import ModalInput from "../ModalInput";
import { useDispatch } from "react-redux";
import { addProduct, editProduct } from "../../rtk/slices/productsSlice";

import { toastFire } from "../../elements/toastFire";

function ProductsModalBody({ forEdit, closeHandler, initialFormData }) {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

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
    e.preventDefault();
    setSubmitted(true);
    if (e.currentTarget.checkValidity()) {
      console.log(formData);
      dispatch(forEdit ? editProduct(formData) : addProduct(formData));
      toastFire(
        "success",
        `تم ${forEdit ? "تعديل" : "اضافة"} ${initialFormData.name} بنجاح`
      );
      setSubmitted(false);
      setFormData(initialFormData);
      closeHandler();
    }
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
    <div className="p-4">
      <div className="modal-header border-bottom-0 p-0 mb-2 text-center text-sm-end">
        <h1
          className="modal-title fs-medium fw-semibold flex-grow-1"
          id="exampleModalLabel"
        >
          {forEdit ? `تعديل الصنف | ${initialFormData.name}` : "إضافة صنف"}
        </h1>
        <button
          type="button"
          className="btn-close m-0 fs-smallest"
          onClick={closeHandler}
          aria-label="Close"
        ></button>
      </div>
      <p className="text-body-secondary fs-small text-center text-sm-end m-0">
        {forEdit
          ? "يجب عليك ملء الخانات المراد تعديلها"
          : "يجب عليك ملء اسم الصنف و الكود اولاً لأضافة صنف جديد"}
      </p>
      <form
        className={`needs-validation ${submitted ? "was-validated" : ""}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="modal-body overflow-y-auto sm-scroll p-0 py-1 my-4">
          <div className="d-flex flex-wrap gap-2">
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
          </div>
        </div>
        <div className="modal-footer border-top-0 p-0 d-flex flex-column flex-sm-row">
          <button
            type="button"
            className="btn btn-light popup-btn w-100"
            onClick={closeHandler}
          >
            إلغاء
          </button>
          <button type="submit" className="btn btn-dark popup-btn w-100">
            {forEdit ? "تعديل" : "إضافة"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductsModalBody;
