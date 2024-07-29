export const handleErrors = (error) => {
  let errorMessage = { type: "string", msg: "Something went wrong!" };

  if (typeof error === "string") {
    errorMessage = { type: "string", msg: error };
  } else if (error && error.msg) {
    errorMessage = { type: "string", msg: error.msg };
  } else if (error && error.errors) {
    errorMessage = { type: "array", data: error.errors };
  }

  return errorMessage;
};
