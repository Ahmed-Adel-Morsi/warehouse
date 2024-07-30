import { useState } from "react";
import CustomModal from "../CustomModal";
import { selectTogglerSvg } from "../../svgs/pageContentSVGs";
import { fetchVendors } from "../../features/vendorsSlice";
import { vendorsSvg } from "../../svgs/sidebarSVGs";
import useFetch from "../../hooks/useFetch";
import { toastFire } from "../../utils/toastFire";
import MainButton from "../MainButton";
import { Modal } from "react-bootstrap";
import useModal from "../../hooks/useModal";
import useSearch from "../../hooks/useSearch";

function ChooseVendor({ setChosenVendor }) {
  const [currentChoice, setCurrentChoice] = useState({});
  const [loading, setLoading] = useState(false);
  const { show, handleClose, handleShow } = useModal();
  const {
    data: vendors,
    error,
    loading: fetchLoading,
  } = useFetch(fetchVendors, "vendors");
  const { filteredData: filteredVendors, filterItems } = useSearch(vendors, [
    "name",
  ]);

  const handleDropdownChoice = (e, vendor) => {
    e.preventDefault();
    document.getElementById("dropdownMenuButton1").firstChild.textContent =
      vendor.name;
    setCurrentChoice(vendor);
    document.querySelectorAll(".dropdown-item").forEach((e) => {
      e.classList.remove("selected-item");
    });
    e.target.classList.add("selected-item");
  };

  const handleVendorChoice = () => {
    setLoading(true);
    if (Object.keys(currentChoice).length !== 0) {
      setChosenVendor(currentChoice);
      toastFire("success", `تم اختيار المورد ${currentChoice.name} بنجاح`);
    } else {
      toastFire("warning", "يرجى اختيار المورد من فضلك");
    }
    setLoading(false);
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
                  className="form-control border-0 border-bottom rounded-0 shadow-none mb-2 no-outline search-input pe-30px"
                  placeholder="ابحث عن المورد بالإسم"
                  onInput={filterItems}
                />
                {fetchLoading ? (
                  <div className="p-4 text-center fs-small fw-medium">
                    جارى التحميل...
                  </div>
                ) : error ? (
                  <div className="p-4 text-center fs-small fw-medium">
                    حدث خطأ ما
                    <p>Error: {error.msg}</p>
                  </div>
                ) : (
                  <div className="overflow-y-auto mh-6rem sm-scroll">
                    {filteredVendors.map((vendor) => (
                      <li className="text-end" key={vendor._id}>
                        <a
                          className="dropdown-item rounded py-1 pe-30px btn-hov"
                          href="/"
                          onClick={(e) => handleDropdownChoice(e, vendor)}
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
            loadingState={loading}
          />
        </CustomModal>
      </Modal>
    </>
  );
}

export default ChooseVendor;
