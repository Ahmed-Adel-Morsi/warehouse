import { deleteProduct } from "../features/productsSlice";
import { actionsSvg, productTransactionsSvg } from "../svgs/actionsSVGs";
import AddandEditProduct from "../components/modals/AddandEditProduct";
import { Link } from "react-router-dom";
import { Row, Data } from "../components/CustomTable";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import RemoveItem from "../components/modals/RemoveItem";
import useSearch from "../hooks/useSearch";
import { useSelector } from "react-redux";
import TableSection from "../components/TableSection";

function Products() {
  const { loading, error, products } = useSelector((state) => state.products);
  const { filteredData: filteredProducts, filterItems } = useSearch(products, [
    "name",
    "code",
  ]);

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
      <TableSection
        loading={loading}
        error={error}
        dataLength={filteredProducts.length}
        pageName="products"
      >
        {filteredProducts.map((product, index, arr) => (
          <Row key={product._id} last={index === arr.length - 1}>
            <Data body={product.name} />
            <Data body={product.code} />
            <Data body={product.brand} />
            <Data body={product.size} />
            <Data body={product.color} />
            <Data body={product.location} />
            <Data body={product.countryOfOrigin} />
            <Data body={product.quantity} />
            <Data body={product.price} />
            <Data
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
                      <AddandEditProduct forEdit initialFormData={product} />
                    </li>
                    <li>
                      <RemoveItem
                        title="حذف الصنف"
                        description="هل انت متاكد؟ سيتم حذف الصنف نهائياً"
                        confirmBtnTitle="حذف الصنف"
                        handler={deleteProduct}
                        itemIdToRemove={product._id}
                      />
                    </li>
                    <li>
                      <Link
                        to={`${product._id}`}
                        className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
                      >
                        {productTransactionsSvg}
                        حركة الصنف
                      </Link>
                    </li>
                  </ul>
                </div>
              }
              last
            />
          </Row>
        ))}
      </TableSection>
    </>
  );
}

export default Products;
