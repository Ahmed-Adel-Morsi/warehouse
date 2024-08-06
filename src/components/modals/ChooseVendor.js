import { useState } from "react";
import CustomModal from "../CustomModal";
import { selectTogglerSvg } from "../../svgs/pageContentSVGs";
import { vendorsSvg } from "../../svgs/sidebarSVGs";
import { toastFire } from "../../utils/toastFire";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";
import { useDispatch, useSelector } from "react-redux";
import { setChosenVendor } from "../../features/addPermissionSlice";
import handleDropdownChoice from "../../utils/handleDropdownChoice";

function ChooseVendor() {
  const [currentChoice, setCurrentChoice] = useState({});
  const { show, handleClose, handleShow } = useModal();
  const { loading, error, vendors } = useSelector((state) => state.vendors);
  const { filteredData: filteredVendors, filterItems } = useSearch(vendors, [
    "name",
  ]);
  const dispatch = useDispatch();

  const handleVendorChoice = () => {
    if (Object.keys(currentChoice).length !== 0) {
      dispatch(setChosenVendor(currentChoice));
      toastFire("success", `تم اختيار المورد ${currentChoice.name} بنجاح`);
    } else {
      toastFire("warning", "يرجى اختيار المورد من فضلك");
    }
  };

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
            <div className="dropdown dropdown-center w-100">
              <button
                className="btn border w-100 d-flex justify-content-between align-items-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                اختر المورد
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
                  placeholder="ابحث عن المورد بالإسم"
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
                    {filteredVendors.map((vendor) => (
                      <li className="text-end" key={vendor._id}>
                        <a
                          className="dropdown-item rounded py-1 pe-30px btn-hov"
                          href="/"
                          onClick={(e) =>
                            handleDropdownChoice(e, vendor, () => {
                              setCurrentChoice(vendor);
                            })
                          }
                        >
                          {vendor.name}
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
            clickHandler={handleVendorChoice}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseVendor;
