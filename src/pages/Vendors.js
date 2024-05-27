import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../features/vendorsSlice";
import {
  actionsSvg,
  removeSvg,
  productTransactionsSvg,
} from "../svgs/actionsSVGs";
import { deleteVendor } from "../features/vendorsSlice";
import AddandEditVendor from "../components/modals/AddandEditVendor";
import CustomModal from "../components/CustomModal";

function Vendors() {
  const vendors = useSelector((state) => state.vendors);
  const dispatch = useDispatch();
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  function filterItems(value) {
    setFilteredVendors(
      vendors.filter(function (vendor) {
        const codeAndName = `${vendor.name} ${vendor.code}`.toLowerCase();
        return codeAndName.includes(value.toString().toLowerCase());
      })
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchVendors()).unwrap();
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setFilteredVendors(vendors);
  }, [vendors]);

  const removeVendorHandler = async (currentVendor) => {
    try {
      await dispatch(deleteVendor(currentVendor.id)).unwrap();
      return true;
    } catch (error) {
      console.error("Failed to delete the vendor:", error);
      return false;
    }
  };

  return (
    <>
      <h1 className="fw-boldest text-center text-lg-end mb-3 mb-md-5">
        الموردين
      </h1>
      <div className="mb-3 d-flex flex-column flex-lg-row justify-content-between">
        <input
          type="search"
          name="addVendor"
          className="form-control w-100 mb-3 mb-lg-0 search-input"
          onChange={(e) => {
            filterItems(e.target.value);
          }}
          placeholder="يمكنك البحث عن الصنف بالإسم والكود"
        />
        <AddandEditVendor />
      </div>
      <div className="border rounded mw-100 overflow-x-auto table-container">
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : filteredVendors.length > 0 ? (
          <table className="table table-hover table-borderless m-0">
            <thead>
              <tr className="table-light border-bottom">
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  اسم العميل
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  كود العميل
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  رقم الهاتف
                </td>
                <td className="border-start fs-small fw-medium text-center align-middle p-3">
                  عنوان العميل
                </td>
                <td className="fs-small fw-medium text-center align-middle p-3">
                  إجراءات
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor, index, arr) => (
                <tr
                  key={vendor.id}
                  className={index !== arr.length - 1 ? "border-bottom" : ""}
                >
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {vendor.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {vendor.code || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {vendor.phoneNumber || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center align-middle p-3">
                    {vendor.address || "-"}
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
                          <AddandEditVendor
                            forEdit={true}
                            initialFormData={vendor}
                          />
                        </li>
                        <li>
                          <CustomModal
                            modalFor="remove"
                            btnIcon={removeSvg}
                            btnTitle="حذف"
                          >
                            <CustomModal.Header title="حذف المورد" />
                            <CustomModal.Body
                              btnTitle="حذف المورد"
                              successMessage={`تم حذف ${vendor.name} بنجاح`}
                              submitHandler={async () =>
                                await removeVendorHandler(vendor)
                              }
                            >
                              هل انت متاكد؟ سيتم حذف المورد نهائياً
                            </CustomModal.Body>
                          </CustomModal>
                        </li>
                        <li>
                          <button className="dropdown-item rounded d-flex align-items-center gap-1 px-2 fs-small fw-medium">
                            {productTransactionsSvg}
                            حركة المورد
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
    </>
  );
}

export default Vendors;
