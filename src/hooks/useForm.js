import { useState } from "react";
import { useDispatch } from "react-redux";
import { toastFire } from "../utils/toastFire";

const useForm = (
  initialState,
  validationSchema,
  submitAction,
  handleSuccess,
  handleFail
) => {
  const [formData, setFormData] = useState(initialState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setFieldErrors({});
      return true;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setFieldErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValid = await validateForm();

    if (isValid) {
      dispatch(submitAction(formData))
        .unwrap()
        .then(() => {
          setFormData(initialState);
          if (handleSuccess) {
            handleSuccess();
          }
        })
        .catch((error) => {
          toastFire("error", error.message);
          if (handleFail) {
            handleFail();
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
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
