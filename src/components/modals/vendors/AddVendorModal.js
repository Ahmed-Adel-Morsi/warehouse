import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import { addCustomerSvg } from "../../../svgs/pageContentSVGs";
import VendorsModalBody from "./VendorsModalBody";
import { getLastVendor } from "../../../features/vendorsSlice";

function AddVendorModal() {
  const theme = useSelector((state) => state.theme);
  const lastVendor = useSelector(getLastVendor);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialFormData = {
    name: "",
    code: lastVendor ? lastVendor.code + 1 : 1,
    phoneNumber: "",
    address: "",
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
        إضافة مورد
        {addCustomerSvg}
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
          forEdit={false}
          initialFormData={initialFormData}
        />
      </Modal>
    </>
  );
}

export default AddVendorModal;
