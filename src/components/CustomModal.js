import { useState, createContext, useContext } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { toastFire } from "../elements/toastFire";
import MainButton from "./MainButton";
import { useSelector } from "react-redux";

const ModalContext = createContext();

function CustomModal({
  children,
  btnTitle,
  btnIcon,
  modalFor,
  btnStyle = false,
  dangerVariant = false,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ModalContext.Provider value={{ handleClose, dangerVariant }}>
      {btnStyle ? (
        <button type="button" className={btnStyle} onClick={handleShow}>
          {btnIcon}
          {btnTitle}
        </button>
      ) : ["edit", "remove"].includes(modalFor) ? (
        <button
          type="button"
          className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
          onClick={handleShow}
        >
          {btnIcon}
          {btnTitle}
        </button>
      ) : (
        <MainButton
          btnIcon={btnIcon}
          clickHandler={handleShow}
          btnTitle={btnTitle}
        />
      )}
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

function ModalHeader({ children, title }) {
  const { handleClose } = useContext(ModalContext);
  return (
    <>
      <div className="modal-header border-bottom-0 p-0 mb-2 text-center text-sm-end">
        <h1
          className="modal-title fs-medium fw-semibold flex-grow-1 text-theme-color"
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

function ModalBody({
  children,
  submitHandler,
  btnTitle,
  successMessage = false,
  warningMessage = false,
  loadingState,
  disableSubmit,
}) {
  const { handleClose, dangerVariant } = useContext(ModalContext);
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useSelector((state) => state.theme);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      if (await submitHandler(e)) {
        handleClose();
        if (successMessage) {
          toastFire("success", successMessage);
        }
      } else {
        if (warningMessage) {
          toastFire("warning", warningMessage);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toastFire("error", "Failed to submit the form.");
    }
  };
  return (
    <form
      className={`needs-validation ${submitted ? "was-validated" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {children && (
        <div className="modal-body overflow-y-auto sm-scroll p-0 py-1 my-3">
          <div className="d-flex flex-wrap gap-3">{children}</div>
        </div>
      )}
      <div className="modal-footer border-top-0 p-0 d-flex flex-column flex-sm-row mt-3">
        <button
          type="submit"
          className={`btn ${
            dangerVariant
              ? "btn-danger"
              : theme === "dark"
              ? "btn-light"
              : "btn-dark"
          } popup-btn d-flex justify-content-center align-items-center gap-2 fw-medium fs-small border-0 px-3 py-2 order-sm-2`}
          disabled={loadingState || disableSubmit}
        >
          {btnTitle}
          {loadingState && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </button>
        <button
          type="button"
          className="btn popup-btn close-btn border fw-medium fs-small px-3 py-2"
          onClick={handleClose}
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}

CustomModal.Header = ModalHeader;
CustomModal.Body = ModalBody;
export default CustomModal;
