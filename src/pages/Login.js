import { useEffect } from "react";
import MainButton from "../components/MainButton";
import { useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { loginSchema } from "../schemas/userSchema";
import CustomInput from "../components/CustomInput";

function Login() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { formData, fieldErrors, loading, handleChange, handleSubmit } =
    useForm({ userName: "", password: "" }, loginSchema, loginUser);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <div
        className="p-4 border rounded"
        style={{ width: "100%", maxWidth: "24rem" }}
      >
        <h3 className="fw-semibold fs-4 mb-2">تسجيل الدخول</h3>
        <p className="text-muted fs-small">
          يمكنك استخدام اسم المستخدم 'admin' مع كلمة المرور 'admin' لتسجيل
          الدخول وتجربة البرنامج.
        </p>
        <form
          onSubmit={handleSubmit}
          className={`d-flex flex-column gap-3`}
          noValidate
        >
          <div>
            <label className="mb-2 fs-small" htmlFor="userName">
              اسم المستخدم
            </label>
            <CustomInput
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              invalidFeedback={fieldErrors.userName}
            />
          </div>
          <div>
            <label className="mb-2 fs-small" htmlFor="password">
              كلمة المرور
            </label>
            <CustomInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              invalidFeedback={fieldErrors.password}
            />
          </div>
          <MainButton
            type="submit"
            btnTitle={
              loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "تسجيل الدخول"
              )
            }
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
