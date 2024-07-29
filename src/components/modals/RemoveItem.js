import { useDispatch } from "react-redux";
import { removeSvg } from "../../svgs/actionsSVGs";
import CustomModal from "../CustomModal";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toastFire } from "../../utils/toastFire";
import DropdownSmallButton from "../DropdownSmallButton";
import useModal from "../../hooks/useModal";

function RemoveItem({
  title,
  description,
  confirmBtnTitle,
  handler,
  itemIdToRemove,
}) {
  const [loading, setLoading] = useState(false);
  const { show, handleClose, handleShow } = useModal();
  const dispatch = useDispatch();

  const deleteItemHandler = () => {
    setLoading(true);
    dispatch(handler(itemIdToRemove))
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        toastFire("error", "حدث خطأ ما");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <DropdownSmallButton
        btnTitle="حذف"
        btnIcon={removeSvg}
        clickHandler={handleShow}
      />

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
            confirmBtnTitle={confirmBtnTitle}
            clickHandler={deleteItemHandler}
            loadingState={loading}
            dangerVariantConfirmBtn
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default RemoveItem;
