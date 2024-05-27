import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { selectTogglerSvg } from "../../svgs/pageContentSVGs";
import { fetchCustomers } from "../../features/customersSlice";
import { customersSvg } from "../../svgs/sidebarSVGs";

function ChooseCustomer({ setChosenCustomer }) {
  const customers = useSelector((state) => state.customers);
  const [currentChoice, setCurrentChoice] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCustomerChoice = () => {
    if (document.getElementById("hiddenInput").value) {
      setChosenCustomer(currentChoice);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customers, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCustomers()).unwrap();
    };
    fetchData();
  }, [dispatch]);

  return (
    <CustomModal btnTitle="اختر العميل" btnIcon={customersSvg}>
      <CustomModal.Header title="اختر العميل">
        يرجي اختيار العميل من فضلك
      </CustomModal.Header>
      <CustomModal.Body
        btnTitle="اضافة"
        submitHandler={() => handleCustomerChoice()}
        successMessage={`تم اختيار العميل ${currentChoice.name} بنجاح`}
        warningMessage="يرجى اختيار العميل"
      >
        <div className="dropdown dropdown-center w-100">
          <button
            className="btn border w-100 d-flex justify-content-between align-items-center"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            اختر العميل
            {selectTogglerSvg}
          </button>
          <ul
            className="dropdown-menu pt-0 position-fixed"
            aria-labelledby="dropdownMenuButton1"
          >
            <input
              type="text"
              className="form-control border-0 border-bottom shadow-none mb-2 no-outline search-input"
              placeholder="ابحث عن العميل بالإسم"
              onInput={handleInput}
            />
            <input type="hidden" id="hiddenInput" required />
            <div className="overflow-y-auto mh-6rem sm-scroll">
              {filteredCustomers.map((customer) => (
                <li key={customer.id}>
                  <a
                    className="dropdown-item"
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(
                        "dropdownMenuButton1"
                      ).textContent = customer.name;
                      document.getElementById("hiddenInput").value =
                        customer.name;
                      setCurrentChoice(customer);
                    }}
                  >
                    {customer.name}
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

export default ChooseCustomer;
