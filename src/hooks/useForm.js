import { useState } from "react";
import { useDispatch } from "react-redux";
import { toastFire } from "../utils/toastFire";

const useForm = (initialState, submitAction, handleSuccess, handleFail) => {
  const [formData, setFormData] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(submitAction(formData))
      .unwrap()
      .then(() => {
        setFormData(initialState);
        setFieldErrors({});
        if (handleSuccess) {
          handleSuccess();
        }
      })
      .catch((error) => {
        if (error.type === "array") {
          const allFieldErrors = error.data.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {});
          setFieldErrors(allFieldErrors);
        } else {
          toastFire("error", error.msg);
        }
        if (handleFail) {
          handleFail();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    formData,
    setFormData,
    fieldErrors,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
