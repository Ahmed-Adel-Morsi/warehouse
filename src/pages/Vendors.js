import { actionsSvg, productTransactionsSvg } from "../svgs/actionsSVGs";
import { deleteVendor } from "../features/vendorsSlice";
import AddandEditVendor from "../components/modals/AddandEditVendor";
import { Row, Data } from "../components/CustomTable";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import RemoveItem from "../components/modals/RemoveItem";
import useSearch from "../hooks/useSearch";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TableSection from "../components/TableSection";

function Vendors() {
  const { loading, error, vendors } = useSelector((state) => state.vendors);
  const { filteredData: filteredVendors, filterItems } = useSearch(vendors, [
    "name",
    "code",
  ]);

  return (
    <>
      <PageHeader>الموردين</PageHeader>
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
        <SearchInput
          name="vendorsFilter"
          placeholder="يمكنك البحث عن المورد بالإسم والكود"
          onChange={filterItems}
        />
        <AddandEditVendor />
      </div>
      <TableSection
        loading={loading}
        error={error}
        dataLength={filteredVendors.length}
        pageName="vendors"
      >
        {filteredVendors.map((vendor, index, arr) => (
          <Row key={vendor._id} last={index === arr.length - 1}>
            <Data body={vendor.name} />
            <Data body={vendor.code} />
            <Data body={vendor.phoneNumber} />
            <Data body={vendor.address} />
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
                      <AddandEditVendor forEdit initialFormData={vendor} />
                    </li>
                    <li>
                      <RemoveItem
                        title="حذف المورد"
                        description="هل انت متاكد؟ سيتم حذف المورد نهائياً"
                        confirmBtnTitle="حذف المورد"
                        handler={deleteVendor}
                        itemIdToRemove={vendor._id}
                      />
                    </li>
                    <li>
                      <Link
                        to={`${vendor._id}`}
                        className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium"
                      >
                        {productTransactionsSvg}
                        حركة المورد
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

export default Vendors;
