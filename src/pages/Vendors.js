import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../features/vendorsSlice";
import { actionsSvg, productTransactionsSvg } from "../svgs/actionsSVGs";
import { deleteVendor } from "../features/vendorsSlice";
import AddandEditVendor from "../components/modals/AddandEditVendor";
import DangerPopup from "../components/modals/DangerPopup";
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import SearchInput from "../components/SearchInput";
import PageHeader from "../components/PageHeader";

function Vendors() {
  const {
    data: vendors,
    loading,
    error,
  } = useSelector((state) => state.vendors);
  const dispatch = useDispatch();
  const [filteredVendors, setFilteredVendors] = useState([]);

  const filterItems = (e) => {
    const value = e.target.value;
    setFilteredVendors(
      vendors.filter(function (vendor) {
        const codeAndName = `${vendor.name} ${vendor.code}`.toLowerCase();
        return codeAndName.includes(value.toString().toLowerCase());
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchVendors()).unwrap();
      } catch (err) {
        console.error("Failed to fetch vendors:", err);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredVendors(vendors);
  }, [vendors]);

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
            <p>Error: {error}</p>
          </div>
        ) : filteredVendors.length > 0 ? (
          <CustomTable>
            <thead>
              <CustomTable.Row header={true}>
                <CustomTable.Data body="اسم العميل" />
                <CustomTable.Data body="كود العميل" />
                <CustomTable.Data body="رقم الهاتف" />
                <CustomTable.Data body="عنوان العميل" />
                <CustomTable.Data body="إجراءات" last={true} />
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
                              forEdit={true}
                              initialFormData={vendor}
                            />
                          </li>
                          <li>
                            <DangerPopup
                              buttonTitle="حذف"
                              title="حذف المورد"
                              itemToRemove={vendor}
                              handler={deleteVendor}
                              description="هل انت متاكد؟ سيتم حذف المورد نهائياً"
                              submitBtnTitle="حذف المورد"
                            />
                          </li>
                          <li>
                            <button className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium">
                              {productTransactionsSvg}
                              حركة المورد
                            </button>
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

export default Vendors;
