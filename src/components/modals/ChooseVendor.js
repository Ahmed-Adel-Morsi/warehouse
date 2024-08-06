import { useState } from "react";
import CustomModal from "../CustomModal";
import { vendorsSvg } from "../../svgs/sidebarSVGs";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { setChosenVendor } from "../../features/addPermissionSlice";
import CustomSelect from "../CustomSelect";

function ChooseVendor() {
  const [currentChoice, setCurrentChoice] = useState(null);
  const { show, handleClose, handleShow } = useModal();
  const { loading, error, vendors } = useSelector((state) => state.vendors);
  const dispatch = useDispatch();

  return (
    <>
      <MainButton
        btnTitle="اختر المورد"
        btnIcon={vendorsSvg}
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
          <CustomModal.Header
            title="اختر المورد"
            description="يرجي اختيار المورد من فضلك"
          />
          <CustomModal.Body>
            <CustomSelect
              currentState={{ loading, error, data: vendors }}
              chosenItem={currentChoice}
              setChosenItem={setCurrentChoice}
              itemName="المورد"
            />
          </CustomModal.Body>
          <CustomModal.Footer
            confirmBtnTitle="اضافة"
            clickHandler={() => {
              dispatch(setChosenVendor(currentChoice));
            }}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseVendor;
