import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { selectTogglerSvg } from "../../svgs/pageContentSVGs";
import { fetchVendors } from "../../features/vendorsSlice";
import { vendorsSvg } from "../../svgs/sidebarSVGs";

function ChooseVendor({ setChosenVendor }) {
  const { data: vendors, loading } = useSelector((state) => state.vendors);
  const [currentChoice, setCurrentChoice] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleVendorChoice = () => {
    if (Object.keys(currentChoice).length !== 0) {
      setChosenVendor(currentChoice);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const filtered = vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVendors(filtered);
  }, [vendors, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchVendors()).unwrap();
    };
    fetchData();
  }, [dispatch]);

  return (
    <CustomModal btnTitle="اختر المورد" btnIcon={vendorsSvg}>
      <CustomModal.Header title="اختر المورد">
        يرجي اختيار المورد من فضلك
      </CustomModal.Header>
      <CustomModal.Body
        btnTitle="اضافة"
        submitHandler={handleVendorChoice}
        loadingState={loading}
        successMessage={`تم اختيار المورد ${currentChoice.name} بنجاح`}
        warningMessage="يرجى اختيار المورد"
      >
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
              onInput={handleInput}
            />
            <div className="overflow-y-auto mh-6rem sm-scroll">
              {filteredVendors.map((vendor) => (
                <li className="px-1 text-end" key={vendor._id}>
                  <a
                    className="dropdown-item rounded py-1 pe-4"
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(
                        "dropdownMenuButton1"
                      ).firstChild.textContent = vendor.name;
                      setCurrentChoice(vendor);
                    }}
                  >
                    {vendor.name}
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </CustomModal.Body>
    </CustomModal>
  );
}

export default ChooseVendor;
