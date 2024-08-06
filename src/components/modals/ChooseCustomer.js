import { useState } from "react";
import CustomModal from "../CustomModal";
import { customersSvg } from "../../svgs/sidebarSVGs";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { setChosenCustomer } from "../../features/soldPermissionSlice";
import CustomSelect from "../CustomSelect";

function ChooseCustomer() {
  const [currentChoice, setCurrentChoice] = useState(null);
  const { show, handleClose, handleShow } = useModal();
  const { loading, error, customers } = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  return (
    <>
      <MainButton
        btnTitle="اختر العميل"
        btnIcon={customersSvg}
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
            title="اختر العميل"
            description="يرجي اختيار العميل من فضلك"
          />
          <CustomModal.Body>
            <CustomSelect
              currentState={{ loading, error, data: customers }}
              chosenItem={currentChoice}
              setChosenItem={setCurrentChoice}
              itemName="العميل"
            />
          </CustomModal.Body>
          <CustomModal.Footer
            confirmBtnTitle="اضافة"
            clickHandler={() => {
              dispatch(setChosenCustomer(currentChoice));
            }}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseCustomer;
