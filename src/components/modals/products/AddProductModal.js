import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import { addProductSvg } from "../../../svgs/pageContentSVGs";
import ProductsModalBody from "./ProductsModalBody";

function AddProductModal({ title }) {
  const theme = useSelector((state) => state.theme);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialFormData = {
    name: "",
    code: "",
    brand: "",
    size: "",
    color: "",
    location: "",
    countryOfOrigin: "",
    quantity: "",
    price: "",
  };

  return (
    <>
      <button
        type="button"
        className={`btn ${
          theme === "dark" ? "btn-light" : "btn-dark"
        } d-flex align-items-center justify-content-center py-2 px-3 fs-small fw-medium gap-1`}
        onClick={handleShow}
      >
        {title}
        {addProductSvg}
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ProductsModalBody
          closeHandler={handleClose}
          forEdit={false}
          initialFormData={initialFormData}
        />
      </Modal>
    </>
  );
}

export default AddProductModal;
