import CustomModal from "../CustomModal";
import { editSvg } from "../../svgs/actionsSVGs";
import { addCustomerSvg } from "../../svgs/pageContentSVGs";
import ModalInput from "../CustomInput";
import { addCustomer, editCustomer } from "../../features/customersSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

function AddandEditCustomer({
  forEdit = false,
  initialFormData = {
    name: "",
    phoneNumber: "",
    address: "",
  },
  newCustomer = false,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    if (e.currentTarget.checkValidity()) {
      try {
        setLoading(true);
        await dispatch(
          forEdit ? editCustomer(formData) : addCustomer(formData)
        ).unwrap();
        setFormData(initialFormData);
        setLoading(false);
        return true;
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        return false;
      }
    }
    return false;
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
    <CustomModal
      btnTitle={forEdit ? "تعديل" : `إضافة عميل ${newCustomer ? "جديد" : ""}`}
      btnIcon={forEdit ? editSvg : addCustomerSvg}
      modalFor={forEdit ? "edit" : false}
    >
      <CustomModal.Header
        title={
          forEdit
            ? `تعديل بيانات العميل | ${initialFormData.name}`
            : "إضافة عميل"
        }
      >
        {forEdit
          ? "يجب عليك ملء الخانات المراد تعديلها"
          : "يجب عليك ملء اسم العميل اولاً لأضافة عميل جديد"}
      </CustomModal.Header>
      <CustomModal.Body
        btnTitle={forEdit ? "تعديل" : "إضافة"}
        submitHandler={handleSubmit}
        successMessage={`تم ${forEdit ? "تعديل" : "اضافة"} ${
          formData.name
        } بنجاح`}
        loadingState={loading}
      >
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
      </CustomModal.Body>
    </CustomModal>
  );
}
export default AddandEditCustomer;
