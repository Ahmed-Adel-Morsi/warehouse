import { useEffect } from "react";
import { useState } from "react";
import MainButton from "../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toastFire } from "../utils/toastFire";

function Login() {
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
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

  const isFieldValid = (e) => {
    let value = e.target.value;

    switch (e.target.name) {
      case "userName":
      case "password":
        return value !== "";

      default:
        return false;
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (e.currentTarget.checkValidity()) {
      try {
        await dispatch(loginUser({ userName, password })).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            toastFire("success", "مرحبا بعودتك تم تسجيل الدخول بنجاح");
            setUserName("");
            setPassword("");
            navigate("/");
          } else {
            toastFire("error", "اسم المستخدم أو كلمة المرور غير صحيحة");
          }
        });
      } catch (error) {
        console.log("Login error:", error);
      }
    }
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
          onSubmit={handleSumbit}
          className={`needs-validation d-flex flex-column gap-3 ${
            submitted ? "was-validated" : ""
          }`}
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
              onBlur={handleChange}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="username"
              required
            />
            <div className="invalid-feedback">يجب إدخال اسم المستخدم</div>
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
              onBlur={handleChange}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <div className="invalid-feedback">يجب إدخال كلمة المرور</div>
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
