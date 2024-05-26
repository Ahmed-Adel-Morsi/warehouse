import { useState, createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { Modal, Spinner } from "react-bootstrap";
import { toastFire } from "../elements/toastFire";

const ModalContext = createContext();

function CustomModal({ children, btnTitle, btnIcon }) {
  const theme = useSelector((state) => state.theme);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ModalContext.Provider value={{ handleClose }}>
      <button
        type="button"
        className={`btn ${
          theme === "dark" ? "btn-light" : "btn-dark"
        } d-flex align-items-center justify-content-center fs-small fw-medium py-2 px-3 gap-1`}
        onClick={handleShow}
      >
        {btnTitle}
        {btnIcon}
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="p-4">{children}</div>
      </Modal>
    </ModalContext.Provider>
  );
}

// Custom component for modal header
function ModalHeader({ children, title }) {
  const { handleClose } = useContext(ModalContext);
  return (
    <>
      <div className="modal-header border-bottom-0 p-0 mb-2 text-center text-sm-end">
        <h1
          className="modal-title fs-medium fw-semibold flex-grow-1"
          id="exampleModalLabel"
        >
          {title}
        </h1>
        <button
          type="button"
          className="btn-close m-0 fs-smallest"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
      <p className="text-body-secondary fs-small text-center text-sm-end m-0">
        {children}
      </p>
    </>
  );
}

function ModalBody({ children, submitHandler, btnTitle }) {
  const { handleClose } = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    if (submitHandler()) {
      handleClose();
      toastFire("success", `تم اختيار العميل بنجاح`);
    } else {
      toastFire("warning", "يرجى اختيار العميل");
    }
    setLoading(false);
  };
  return (
    <form
      className={`needs-validation ${submitted ? "was-validated" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="modal-body overflow-y-auto sm-scroll p-0 py-1 my-3">
        <div className="d-flex flex-wrap gap-3">{children}</div>
      </div>
      <div className="modal-footer border-top-0 p-0 d-flex flex-column flex-sm-row">
        <button
          type="button"
          className="btn btn-light popup-btn w-100"
          onClick={handleClose}
        >
          إلغاء
        </button>
        <button
          type="submit"
          className="btn btn-dark popup-btn w-100 d-flex justify-content-center align-items-center gap-2"
        >
          {btnTitle}
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </form>
  );
}

// Export CustomModal and ModalHeader
CustomModal.Header = ModalHeader;
CustomModal.Body = ModalBody;
export default CustomModal;
