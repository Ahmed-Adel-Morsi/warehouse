import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import { addCustomerSvg } from "../../../svgs/pageContentSVGs";
import CustomersModalBody from "./CustomersModalBody";
import { getLastCustomer } from "../../../features/customersSlice";

function AddCustomerModal({ title }) {
  const theme = useSelector((state) => state.theme);
  const lastCustomer = useSelector(getLastCustomer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialFormData = {
    name: "",
    code: lastCustomer ? lastCustomer.code + 1 : 1,
    phoneNumber: "",
    address: "",
  };

  return (
    <>
      <button
        type="button"
        className={`btn ${
          theme === "dark" ? "btn-light" : "btn-dark"
        } d-flex align-items-center justify-content-center fs-small fw-medium py-2 px-3 gap-1`}
        onClick={handleShow}
      >
        {title}
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
        <CustomersModalBody
          closeHandler={handleClose}
          forEdit={false}
          initialFormData={initialFormData}
        />
      </Modal>
    </>
  );
}

export default AddCustomerModal;
