import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  userName: Yup.string().required("يجب إدخال اسم المستخدم"),
  password: Yup.string().required("يجب إدخال كلمة المرور"),
});

const registerSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "يجب أن يكون اسم المستخدم على الأقل 3 أحرف")
    .max(50, "يجب أن يكون اسم المستخدم أقل من 50 حرف")
    .required("يجب إدخال اسم المستخدم"),
  password: Yup.string()
    .min(5, "يجب أن تكون كلمة المرور على الأقل 5 أحرف")
    .required("يجب إدخال كلمة المرور"),
  rePassword: Yup.string()
    .required("يجب إعادة إدخال كلمة المرور")
    .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة"),
});

export { loginSchema, registerSchema };
