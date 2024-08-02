import * as Yup from "yup";

const customerSchema = Yup.object().shape({
  name: Yup.string().required("يجب إدخال اسم العميل"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]*$/, "يجب إدخال أرقام فقط")
    .nullable(),
  address: Yup.string().nullable(),
});

export default customerSchema;
