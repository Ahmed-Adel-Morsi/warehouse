import CustomModal from "../CustomModal";
import { editSvg } from "../../svgs/actionsSVGs";
import { addCustomerSvg } from "../../svgs/pageContentSVGs";
import ModalInput from "../CustomInput";
import { addVendor, editVendor } from "../../features/vendorsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

function AddandEditVendor({
  forEdit = false,
  initialFormData = {
    name: "",
    phoneNumber: "",
    address: "",
  },
  btnTitle = "إضافة مورد",
}) {
  const [formData, setFormData] = useState(initialFormData);
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

  const handleSubmit = async (e) => {
    if (e.currentTarget.checkValidity()) {
      try {
        setLoading(true);
        await dispatch(
          forEdit ? editVendor(formData) : addVendor(formData)
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
      btnTitle={forEdit ? "تعديل" : btnTitle}
      btnIcon={forEdit ? editSvg : addCustomerSvg}
      modalFor={forEdit ? "edit" : false}
    >
      <CustomModal.Header
        title={
          forEdit
            ? `تعديل بيانات المورد | ${initialFormData.name}`
            : "إضافة مورد"
        }
      >
        {forEdit
          ? "يجب عليك ملء الخانات المراد تعديلها"
          : "يجب عليك ملء اسم المورد اولاً لأضافة مورد جديد"}
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
          label="اسم المورد"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          invalidFeedback="يجب إدخال اسم المورد"
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
          label="عنوان المورد"
          value={formData.address}
          onChange={handleChange}
        />
      </CustomModal.Body>
    </CustomModal>
  );
}
export default AddandEditVendor;
