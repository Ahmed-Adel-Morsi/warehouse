import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";
import {
  actionsSvg,
  productTransactionsSvg,
  removeSvg,
} from "../svgs/actionsSVGs";
import RemoveItemModal from "../components/modals/RemoveItemModal";
import AddProductsModal from "../components/modals/AddProductModal";
import EditProductModal from "../components/modals/EditProductModal";

function Products() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productToBeRemove, setProductToBeRemove] = useState();
  const [loading, setLoading] = useState(true);

  function filterItems(value) {
    setFilteredProducts(
      products.filter(function (product) {
        const codeAndName = `${product.name} ${product.code}`.toLowerCase();
        return codeAndName.includes(value.toString().toLowerCase());
      })
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProducts()).unwrap();
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <>
      <h1 className="fw-boldest text-center text-lg-end mb-4">ارصدة المخزن</h1>
      <div className="py-3 d-flex flex-column flex-lg-row justify-content-between">
        <input
          type="search"
          name="addProduct"
          className="form-control w-100 mb-3 mb-lg-0 search-input"
          onChange={(e) => {
            filterItems(e.target.value);
          }}
          placeholder="يمكنك البحث عن الصنف بالإسم والكود"
        />
        <AddProductsModal />
      </div>
      <div className="border rounded mw-100 overflow-x-auto table-container">
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : filteredProducts.length > 0 ? (
          <table className="table table-hover table-borderless m-0">
            <thead>
              <tr className="table-light border-bottom">
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  اسم الصنف
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  الكود
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  الماركة
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  الحجم
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  اللون
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  المكان
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  بلد المنشـأ
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  العدد
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  السعر
                </td>
                <td className="fs-small fw-medium text-center align-middle p-3">
                  إجراءات
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index, arr) => (
                <tr
                  key={product.id}
                  className={index !== arr.length - 1 ? "border-bottom" : ""}
                >
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.code || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.brand || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.size || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.color || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.location || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.countryOfOrigin || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.quantity || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {product.price || "-"}
                  </td>
                  <td className="fs-small text-center align-middle p-1">
                    <div className="dropdown-center position-static d-flex justify-content-center">
                      <button
                        type="button"
                        className="list-group-item list-group-item-action gap-2 fs-small w-2rem h-2rem rounded btn-hov"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {actionsSvg}
                      </button>
                      <ul className="dropdown-menu position-absolute p-1">
                        <li className="text-end p-2 fw-semibold">إجراءات</li>
                        <hr className="my-1" />
                        <li>
                          <EditProductModal productToEdit={product} />
                        </li>
                        <li>
                          <button
                            className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
                            data-bs-toggle="modal"
                            data-bs-target="#removeItemModal"
                            onClick={() => setProductToBeRemove(product)}
                          >
                            {removeSvg}
                            حذف
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium">
                            {productTransactionsSvg}
                            حركة الصنف
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-4 text-center fs-small fw-medium">
            لا يوجد بيانات
          </div>
        )}
      </div>
      <RemoveItemModal productToDelete={productToBeRemove} />
    </>
  );
}

export default Products;
