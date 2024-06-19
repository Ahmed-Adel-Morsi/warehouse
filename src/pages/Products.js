import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../features/productsSlice";
import { actionsSvg, productTransactionsSvg } from "../svgs/actionsSVGs";
import AddandEditProduct from "../components/modals/AddandEditProduct";
import DangerPopup from "../components/modals/DangerPopup";
import { Link } from "react-router-dom";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";

function Products() {
  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterItems = (e) => {
    const value = e.target.value;
    setFilteredProducts(
      products.filter(function (product) {
        const codeAndName = `${product.name} ${product.code}`.toLowerCase();
        return codeAndName.includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <>
      <PageHeader>ارصدة المخزن</PageHeader>
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <SearchInput
          name="productsFilter"
          placeholder="يمكنك البحث عن الصنف بالإسم والكود"
          onChange={filterItems}
        />
        <AddandEditProduct />
      </div>
      <TableContainer>
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : error ? (
          <div className="p-4 text-center fs-small fw-medium">
            حدث خطأ ما
            <p>Error: {error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <CustomTable>
            <thead>
              <CustomTable.Row header={true}>
                <CustomTable.Data body="اسم الصنف" />
                <CustomTable.Data body="الكود" />
                <CustomTable.Data body="الماركة" />
                <CustomTable.Data body="الحجم" />
                <CustomTable.Data body="اللون" />
                <CustomTable.Data body="المكان" />
                <CustomTable.Data body="بلد المنشـأ" />
                <CustomTable.Data body="العدد" />
                <CustomTable.Data body="السعر" />
                <CustomTable.Data body="إجراءات" last={true} />
              </CustomTable.Row>
            </thead>
            <tbody>
              {filteredProducts.map((product, index, arr) => (
                <CustomTable.Row
                  key={product.id}
                  last={index === arr.length - 1}
                >
                  <CustomTable.Data body={product.name} />
                  <CustomTable.Data body={product.code} />
                  <CustomTable.Data body={product.brand} />
                  <CustomTable.Data body={product.size} />
                  <CustomTable.Data body={product.color} />
                  <CustomTable.Data body={product.location} />
                  <CustomTable.Data body={product.countryOfOrigin} />
                  <CustomTable.Data body={product.quantity} />
                  <CustomTable.Data body={product.price} />
                  <CustomTable.Data
                    body={
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
                            <AddandEditProduct
                              forEdit={true}
                              initialFormData={product}
                            />
                          </li>
                          <li>
                            <DangerPopup
                              buttonTitle="حذف"
                              title="حذف الصنف"
                              itemToRemove={product}
                              handler={deleteProduct}
                              description="هل انت متاكد؟ سيتم حذف الصنف نهائياً"
                              submitBtnTitle="حذف الصنف"
                            />
                          </li>
                          <li>
                            <Link
                              to={`${product.id}`}
                              className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
                            >
                              {productTransactionsSvg}
                              حركة الصنف
                            </Link>
                          </li>
                        </ul>
                      </div>
                    }
                    last={true}
                  />
                </CustomTable.Row>
              ))}
            </tbody>
          </CustomTable>
        ) : (
          <div className="p-4 text-center fs-small fw-medium">
            لا يوجد بيانات
          </div>
        )}
      </TableContainer>
    </>
  );
}

export default Products;
