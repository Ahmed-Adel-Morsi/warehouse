import { useState } from "react";
import { Modal } from "react-bootstrap";

import ProductsModalBody from "./ProductsModalBody";
import { editSvg } from "../../svgs/actionsSVGs";

function EditProductModal({ productToEdit }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <button
        type="button"
        className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
        onClick={handleShow}
      >
        {editSvg}
        تعديل
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
          forEdit={true}
          initialFormData={{ ...productToEdit }}
        />
      </Modal>
    </>
  );
}

export default EditProductModal;
