import CustomModal from "../CustomModal";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import useModal from "../../hooks/useModal";

function DangerPopup({
  handler,
  btnIcon,
  btnTitle,
  title,
  description,
  confirmBtnTitle,
  loadingState,
  btnStyle,
}) {
  const { show, handleClose, handleShow } = useModal();

  return (
    <>
      {btnStyle ? (
        <button type="button" className={btnStyle} onClick={handleShow}>
          {btnIcon}
          {btnTitle}
        </button>
      ) : (
        <MainButton
          clickHandler={handleShow}
          btnTitle={btnTitle}
          btnIcon={btnIcon}
        />
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <CustomModal handleClose={handleClose}>
          <CustomModal.Header title={title} description={description} />
          <CustomModal.Footer
            dangerVariantConfirmBtn
            loadingState={loadingState}
            confirmBtnTitle={confirmBtnTitle}
            clickHandler={handler}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default DangerPopup;
