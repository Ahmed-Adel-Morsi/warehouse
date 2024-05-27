import { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { selectTogglerSvg } from "../../svgs/pageContentSVGs";
import { fetchProducts } from "../../features/productsSlice";
import { productsSvg } from "../../svgs/sidebarSVGs";
import ModalInput from "../CustomInput";

function ChooseProduct({
  setChosenProduct,
  chosenProduct,
  setOrderedProducts,
}) {
  const products = useSelector((state) => state.products);
  const [currentChoice, setCurrentChoice] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleProductChoice = () => {
    if (document.getElementById("hiddenInput").value) {
      setOrderedProducts((prevProducts) => [...prevProducts, chosenProduct]);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts()).unwrap();
    };
    fetchData();
  }, [dispatch]);

  return (
    <CustomModal btnTitle="اختر الصنف" btnIcon={productsSvg}>
      <CustomModal.Header title="اختر الصنف">
        يرجي اختيار الصنف من فضلك
      </CustomModal.Header>
      <CustomModal.Body
        btnTitle="اضافة"
        submitHandler={() => handleProductChoice()}
        successMessage={`تم اختيار الصنف ${currentChoice.name} بنجاح`}
        warningMessage="يرجى اختيار الصنف"
      >
        <div className="dropdown dropdown-center w-100">
          <button
            className="btn border w-100 d-flex justify-content-between align-items-center"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            اختر الصنف
            {selectTogglerSvg}
          </button>
          <ul
            className="dropdown-menu pt-0 position-fixed"
            aria-labelledby="dropdownMenuButton1"
          >
            <input
              type="text"
              className="form-control border-0 border-bottom shadow-none mb-2 no-outline search-input"
              placeholder="ابحث عن الصنف بالإسم"
              onInput={handleInput}
            />
            <input type="hidden" id="hiddenInput" required />
            <div className="overflow-y-auto mh-6rem sm-scroll">
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <a
                    className="dropdown-item"
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(
                        "dropdownMenuButton1"
                      ).textContent = product.name;
                      document.getElementById("hiddenInput").value =
                        product.name;
                      setCurrentChoice(product);
                      setChosenProduct(product);
                    }}
                  >
                    {product.name}
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </div>
        {chosenProduct && (
          <>
            <div className="d-flex gap-3 text-muted">
              <p>العدد بالمخزن : {chosenProduct.quantity}</p>
              <p>السعر بالمخزن : {chosenProduct.price}</p>
            </div>
            <ModalInput
              type="text"
              name="quantity"
              label="العدد"
              invalidFeedback="يجب إدخال العدد (ارقام فقط)"
              required
            />
            <ModalInput
              type="text"
              name="price"
              label="سعر الوحدة"
              invalidFeedback="يجب إدخال السعر (ارقام فقط)"
              required
            />
          </>
        )}
      </CustomModal.Body>
    </CustomModal>
  );
}

export default ChooseProduct;
