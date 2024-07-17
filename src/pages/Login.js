import { useEffect } from "react";
import { useState } from "react";
import MainButton from "../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toastFire } from "../utils/toastFire";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      if (Array.isArray(error)) {
        const errors = {};
        error.forEach((err) => {
          if (!errors[err.path]) {
            errors[err.path] = err.msg;
          }
        });
        setFieldErrors(errors);
      } else {
        toastFire("error", error.msg);
        setFieldErrors({});
      }
    } else {
      setFieldErrors({});
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ userName, password }));
    toastFire("success", "مرحبا بعودتك تم تسجيل الدخول بنجاح");
  };

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
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              required
            />
            {error && (
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
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            {error && (
              <div className="invalid-feedback d-block">
                {fieldErrors.password}
              </div>
            )}
          </div>
          <MainButton
            type="submit"
            btnTitle={
              isLoading ? (
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
