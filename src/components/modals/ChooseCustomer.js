import { useState } from "react";
import CustomModal from "../CustomModal";
import { selectTogglerSvg } from "../../svgs/pageContentSVGs";
import { customersSvg } from "../../svgs/sidebarSVGs";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import { toastFire } from "../../utils/toastFire";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";
import { useDispatch, useSelector } from "react-redux";
import { setChosenCustomer } from "../../features/soldPermissionSlice";
import handleDropdownChoice from "../../utils/handleDropdownChoice";

function ChooseCustomer() {
  const [currentChoice, setCurrentChoice] = useState({});
  const { show, handleClose, handleShow } = useModal();
  const {
    loading,
    error,
    customers,
  } = useSelector((state) => state.customers);
  const { filteredData: filteredCustomers, filterItems } = useSearch(
    customers,
    ["name"]
  );
  const dispatch = useDispatch();

  const handleCustomerChoice = () => {
    if (Object.keys(currentChoice).length !== 0) {
      dispatch(setChosenCustomer(currentChoice));
      toastFire("success", `تم اختيار العميل ${currentChoice.name} بنجاح`);
    } else {
      toastFire("warning", "يرجى اختيار العميل من فضلك");
    }
  };

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
            <div className="dropdown dropdown-center w-100">
              <button
                className="btn border w-100 d-flex justify-content-between align-items-center btn-hov"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                اختر العميل
                {selectTogglerSvg}
              </button>
              <ul
                className="dropdown-menu pt-0 position-fixed overflow-hidden"
                aria-labelledby="dropdownMenuButton1"
              >
                <input
                  type="text"
                  name="search"
                  className="form-control border-0 border-bottom rounded-0 shadow-none mb-2 no-outline search-input pe-30px"
                  placeholder="ابحث عن العميل بالإسم"
                  onInput={filterItems}
                  autoComplete="off"
                />
                {loading ? (
                  <div className="p-4 text-center fs-small fw-medium">
                    جارى التحميل...
                  </div>
                ) : error ? (
                  <div className="p-4 text-center fs-small fw-medium">
                    حدث خطأ ما:
                    <p>{error.message}</p>
                  </div>
                ) : (
                  <div className="overflow-y-auto mh-6rem sm-scroll">
                    {filteredCustomers.map((customer) => (
                      <li className="text-end" key={customer._id}>
                        <a
                          className="dropdown-item rounded py-1 pe-30px btn-hov"
                          href="/"
                          onClick={(e) =>
                            handleDropdownChoice(e, customer, () => {
                              setCurrentChoice(customer);
                            })
                          }
                        >
                          {customer.name}
                        </a>
                      </li>
                    ))}
                  </div>
                )}
              </ul>
            </div>
          </CustomModal.Body>
          <CustomModal.Footer
            confirmBtnTitle="اضافة"
            clickHandler={handleCustomerChoice}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseCustomer;
