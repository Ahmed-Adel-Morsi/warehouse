import { useState } from "react";
import ModalInput from "../../ModalInput";
import { useDispatch } from "react-redux";
import { addCustomer, editCustomer } from "../../../features/customersSlice";

import { toastFire } from "../../../elements/toastFire";
import { Spinner } from "react-bootstrap";

function CustomersModalBody({ forEdit, closeHandler, initialFormData }) {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    e.preventDefault();
    setSubmitted(true);
    if (e.currentTarget.checkValidity()) {
      console.log(formData);
      dispatch(forEdit ? editCustomer(formData) : addCustomer(formData));
      toastFire(
        "success",
        `تم ${forEdit ? "تعديل" : "اضافة"} ${initialFormData.name} بنجاح`
      );
      setSubmitted(false);
      setFormData(initialFormData);
      closeHandler();
    }
    setLoading(false);
  };

  const isFieldValid = (e) => {
    let value = e.target.value;

    switch (e.target.name) {
      case "name":
        return value !== "";

      case "phoneNumber":
        return value !== "" ? !isNaN(parseInt(value)) : true;

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
          {forEdit
            ? `تعديل بيانات العميل | ${initialFormData.name}`
            : "إضافة عميل"}
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
          : "يجب عليك ملء اسم العميل اولاً لأضافة عميل جديد"}
      </p>
      <form
        className={`needs-validation ${submitted ? "was-validated" : ""}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="modal-body overflow-y-auto sm-scroll p-0 py-1 my-4">
          <div className="d-flex flex-wrap gap-3">
            <ModalInput
              type="text"
              name="name"
              label="اسم العميل"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              invalidFeedback="يجب إدخال اسم العميل"
              required
              disabled={forEdit}
            />
            <ModalInput
              type="text"
              name="phoneNumber"
              label="رقم الهاتف"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              invalidFeedback="يجب إدخال ارقام فقط"
            />
            <ModalInput
              type="text"
              name="address"
              label="عنوان العميل"
              value={formData.address}
              onChange={handleChange}
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
          <button
            type="submit"
            className="btn btn-dark popup-btn w-100 d-flex justify-content-center align-items-center gap-2"
          >
            {forEdit ? "تعديل" : "إضافة"}
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomersModalBody;
