import { fetchVendors } from "../features/vendorsSlice";
import { actionsSvg, productTransactionsSvg } from "../svgs/actionsSVGs";
import { deleteVendor } from "../features/vendorsSlice";
import AddandEditVendor from "../components/modals/AddandEditVendor";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";
import RemoveItem from "../components/modals/RemoveItem";
import useFetch from "../hooks/useFetch";
import useSearch from "../hooks/useSearch";
import { Link } from "react-router-dom";

function Vendors() {
  const { data: vendors, error, loading } = useFetch(fetchVendors, "vendors");
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
      <TableContainer>
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : error ? (
          <div className="p-4 text-center fs-small fw-medium">
            حدث خطأ ما
            <p>Error: {error.msg}</p>
          </div>
        ) : filteredVendors.length > 0 ? (
          <CustomTable>
            <thead>
              <CustomTable.Row header>
                <CustomTable.Data body="اسم المورد" />
                <CustomTable.Data body="كود المورد" />
                <CustomTable.Data body="رقم الهاتف" />
                <CustomTable.Data body="عنوان المورد" />
                <CustomTable.Data body="إجراءات" last />
              </CustomTable.Row>
            </thead>
            <tbody>
              {filteredVendors.map((vendor, index, arr) => (
                <CustomTable.Row
                  key={vendor._id}
                  last={index === arr.length - 1}
                >
                  <CustomTable.Data body={vendor.name} />
                  <CustomTable.Data body={vendor.code} />
                  <CustomTable.Data body={vendor.phoneNumber} />
                  <CustomTable.Data body={vendor.address} />
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
                            <AddandEditVendor
                              forEdit
                              initialFormData={vendor}
                            />
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

export default Vendors;
