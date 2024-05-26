import { useState } from "react";
import { Modal } from "react-bootstrap";

import VendorsModalBody from "./VendorsModalBody";
import { editSvg } from "../../../svgs/actionsSVGs";

function EditVendorModal({ vendorToEdit }) {
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
        <VendorsModalBody
          closeHandler={handleClose}
          forEdit={true}
          initialFormData={{ ...vendorToEdit }}
        />
      </Modal>
    </>
  );
}

export default EditVendorModal;
