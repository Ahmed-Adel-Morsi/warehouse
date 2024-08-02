import * as Yup from "yup";

const productSchema = Yup.object().shape({
  name: Yup.string().required("يجب إدخال اسم الصنف"),
  code: Yup.string().required("يجب إدخال الكود"),
  size: Yup.string()
    .matches(/^[0-9]*$/, "يجب إدخال أرقام فقط")
    .nullable(),
  quantity: Yup.string()
    .matches(/^[0-9]*$/, "يجب إدخال أرقام فقط")
    .nullable(),
  price: Yup.string()
    .matches(/^[0-9]*$/, "يجب إدخال أرقام فقط")
    .nullable(),
  brand: Yup.string().nullable(),
  countryOfOrigin: Yup.string().nullable(),
  location: Yup.string().nullable(),
  color: Yup.string().nullable(),
});

export default productSchema;
