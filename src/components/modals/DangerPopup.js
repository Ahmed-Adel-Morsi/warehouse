import { useDispatch } from "react-redux";
import { removeSvg } from "../../svgs/actionsSVGs";
import CustomModal from "../CustomModal";
import { useState } from "react";

function DangerPopup({
  handler,
  icon = removeSvg,
  buttonTitle,
  title,
  submitBtnTitle,
  successMessage,
  itemToRemove,
  description,
  notRemove = false,
  btnStyle = false,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (notRemove) {
      setLoading(true);
      await handler();
      setLoading(false);
      return true;
    } else {
      try {
        setLoading(true);
        await dispatch(handler(itemToRemove.id)).unwrap();
        setLoading(false);
        return true;
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        return false;
      }
    }
  };

  return (
    <CustomModal
      modalFor={!notRemove && "remove"}
      btnIcon={icon}
      btnTitle={buttonTitle}
      dangerVariant={true}
      btnStyle={btnStyle}
    >
      <CustomModal.Header title={title} />
      <CustomModal.Body
        btnTitle={submitBtnTitle}
        successMessage={successMessage || `تم حذف ${itemToRemove.name} بنجاح`}
        submitHandler={handleSubmit}
        loadingState={loading}
      >
        {description}
      </CustomModal.Body>
    </CustomModal>
  );
}

export default DangerPopup;
