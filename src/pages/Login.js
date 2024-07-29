import { useEffect } from "react";
import MainButton from "../components/MainButton";
import { useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import useForm from "../hooks/useForm";

function Login() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { formData, fieldErrors, loading, handleChange, handleSubmit } =
    useForm({ userName: "", password: "" }, loginUser);

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
            <input
              className="form-control"
              id="userName"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            {fieldErrors.userName && (
              <div className="invalid-feedback d-block">
                {fieldErrors.userName}
              </div>
            )}
          </div>
          <div>
            <label className="mb-2 fs-small" htmlFor="pass">
              كلمة المرور
            </label>
            <input
              className="form-control"
              id="pass"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            {fieldErrors.password && (
              <div className="invalid-feedback d-block">
                {fieldErrors.password}
              </div>
            )}
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
