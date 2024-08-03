import * as Yup from "yup";

const transactionSchema = (chosenProductToSell) => {
  return Yup.object().shape({
    quantity: Yup.string()
      .test(
        "quantity-check",
        `لا يمكن أن يكون العدد أكبر من ${chosenProductToSell?.quantity}`,
        (value) =>
          chosenProductToSell
            ? parseInt(value) <= chosenProductToSell?.quantity
            : true
      )
      .matches(/^[0-9]*$/, "يجب إدخال أرقام فقط")
      .required("يجب إدخال العدد"),
    price: Yup.string()
      .matches(/^[0-9]*$/, "يجب إدخال أرقام فقط")
      .required("يجب إدخال السعر"),
  });
};

export default transactionSchema;
