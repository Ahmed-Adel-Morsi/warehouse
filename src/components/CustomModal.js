import { createContext, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const CloseContext = createContext();

function CustomModal({ handleClose, children }) {
  return (
    <CloseContext.Provider value={handleClose}>
      <div className="p-4">{children}</div>
    </CloseContext.Provider>
  );
}

function CustomModalHeader({ title, description }) {
  const handleClose = useContext(CloseContext);

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
        {description}
      </p>
    </>
  );
}

CustomModal.Body = function ({ children }) {
  return (
    <div className="modal-body overflow-y-auto sm-scroll p-0 py-1 my-3">
      {children}
    </div>
  );
};

function CustomModalFooter({
  formId,
  dangerVariantConfirmBtn,
  loadingState,
  disableConfirmBtn,
  confirmBtnTitle,
  clickHandler,
}) {
  const theme = useSelector((state) => state.theme);
  const handleClose = useContext(CloseContext);

  return (
    <div className="modal-footer border-top-0 p-0 d-flex flex-column flex-sm-row mt-3">
      <button
        type={formId ? "submit" : "button"}
        {...(formId && { form: formId })}
        className={`btn ${
          dangerVariantConfirmBtn
            ? "btn-danger"
            : theme === "dark"
            ? "btn-light"
            : "btn-dark"
        } popup-btn d-flex justify-content-center align-items-center gap-2 fw-medium fs-small border-0 px-3 py-2 order-sm-2`}
        disabled={loadingState || disableConfirmBtn}
        {...(!formId && clickHandler && { onClick: clickHandler })}
      >
        {confirmBtnTitle}
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
  );
}

CustomModal.Header = CustomModalHeader;
CustomModal.Footer = CustomModalFooter;

export default CustomModal;
