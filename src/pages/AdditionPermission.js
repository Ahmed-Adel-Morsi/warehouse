import { useEffect, useState } from "react";
import AddandEditVendor from "../components/modals/AddandEditVendor";
import ChooseVendor from "../components/modals/ChooseVendor";
import CustomModal from "../components/CustomModal";
import { resetSvg, saveSvg } from "../svgs/pageContentSVGs";
import DangerPopup from "../components/modals/DangerPopup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";
import { editProduct } from "../features/productsSlice";
import ChooseProductToBuy from "../components/modals/ChooseProductToBuy";
import AddandEditProduct from "../components/modals/AddandEditProduct";

function AdditionPermission() {
  const [loading, setLoading] = useState(false);
  const [chosenProductToBuy, setChosenProductToBuy] = useState(null);
  const dispatch = useDispatch();

  const removeProductHandler = async (currentProduct) => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem("additionPermissionOrders")
      );
      setAdditionPermissionOrders(
        savedProducts.filter(
          (product) => product.productDetails.id !== currentProduct.id
        )
      );
      return true;
    } catch (error) {
      console.error("Failed to delete the Product:", error);
      return false;
    }
  };

  const resetHandler = () => {
    setChosenVendor(null);
    setChosenProductToBuy(null);
    setAdditionPermissionOrders([]);
    return true;
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      for (const order of additionPermissionOrders) {
        await dispatch(
          addTransaction({
            transactionType: "buy",
            ...order,
            customerDetails: chosenVendor,
          })
        );
        await dispatch(
          editProduct({
            ...order.productDetails,
            quantity:
              (parseInt(order.productDetails.quantity)
                ? parseInt(order.productDetails.quantity)
                : 0) + parseInt(order.quantity),
          })
        );
      }
      resetHandler();
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      return false;
    }
  };

  const [chosenVendor, setChosenVendor] = useState(() => {
    const savedVendor = localStorage.getItem("chosenVendor");
    return savedVendor ? JSON.parse(savedVendor) : null;
  });

  useEffect(() => {
    setLoading(true);
    if (chosenVendor !== null) {
      localStorage.setItem("chosenVendor", JSON.stringify(chosenVendor));
    } else {
      localStorage.removeItem("chosenVendor");
    }
    setLoading(false);
  }, [chosenVendor]);

  const [additionPermissionOrders, setAdditionPermissionOrders] = useState(
    () => {
      const savedProducts = localStorage.getItem("additionPermissionOrders");
      return savedProducts ? JSON.parse(savedProducts) : [];
    }
  );

  useEffect(() => {
    setLoading(true);
    if (additionPermissionOrders.length > 0) {
      localStorage.setItem(
        "additionPermissionOrders",
        JSON.stringify(additionPermissionOrders)
      );
    } else {
      localStorage.removeItem("additionPermissionOrders");
    }
    setLoading(false);
  }, [additionPermissionOrders]);

  return (
    <>
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 fw-semibold">
        <div className="text-center text-md-end">
          {chosenVendor
            ? `اسم المورد : ${chosenVendor.name}`
            : "الرجاء اختيار المورد"}
        </div>
        <div className="d-flex gap-2 w-sm-100 flex-column flex-sm-row flex-grow-1 justify-content-end">
          {!chosenVendor && (
            <>
              <ChooseVendor
                setChosenVendor={setChosenVendor}
                chosenVendor={chosenVendor}
              />
              <AddandEditVendor btnTitle="إضافة مورد جديد" />
            </>
          )}
          {chosenVendor && (
            <>
              <ChooseProductToBuy
                setChosenProductToBuy={setChosenProductToBuy}
                setAdditionPermissionOrders={setAdditionPermissionOrders}
                chosenProductToBuy={chosenProductToBuy}
              />
              <AddandEditProduct btnTitle="إضافة صنف جديد" />
              <DangerPopup
                notRemove={true}
                buttonTitle="إعادة تهيئة"
                title="إعادة تهيئة البيانات"
                icon={resetSvg}
                handler={resetHandler}
                description="هل أنت متأكد؟ سيتم إعادة تهيئة البيانات، إذا كنت ترغب في
                الاحتفاظ بالبيانات، يُرجى الضغط على 'حفظ' قبل إعادة التهيئة."
                submitBtnTitle="إعادة تهيئة"
                successMessage="تمت إعادة تهيئة البيانات بنجاح"
              />
              {additionPermissionOrders.length > 0 && (
                <CustomModal btnIcon={saveSvg} btnTitle="حفظ">
                  <CustomModal.Header title="حفظ البيانات" />
                  <CustomModal.Body
                    btnTitle="حفظ"
                    successMessage="تم حفظ البيانات بنجاح"
                    loadingState={loading}
                    submitHandler={submitHandler}
                  >
                    يرجي تأكيد حفظ البيانات
                  </CustomModal.Body>
                </CustomModal>
              )}
            </>
          )}
        </div>
      </div>
      <div className="border rounded mw-100 overflow-x-auto table-container">
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : additionPermissionOrders.length > 0 ? (
          <table className="table table-hover table-borderless m-0">
            <thead>
              <tr className="table-light border-bottom">
                <td className="border-start fs-small fw-medium text-center p-3">
                  اسم الصنف
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  الكود
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  الماركة
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  الحجم
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  اللون
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  العدد
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  السعر
                </td>
                <td className="border-start fs-small fw-medium text-center p-3">
                  الاجمالى
                </td>
                <td className="fs-small fw-medium text-center p-3">إجراءات</td>
              </tr>
            </thead>
            <tbody>
              {additionPermissionOrders.map((order, index, arr) => (
                <tr
                  key={order.productDetails.id}
                  className={index !== arr.length - 1 ? "border-bottom" : ""}
                >
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {order.productDetails.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {order.productDetails.code || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {order.productDetails.brand || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {order.productDetails.size || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {order.productDetails.color || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {order.quantity || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {order.price || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {order.totalPrice || "-"}
                  </td>
                  <td className="fs-small h-100 d-flex justify-content-center">
                    <DangerPopup
                      notRemove={true}
                      title="حذف الصنف"
                      handler={async () => {
                        await removeProductHandler(order.productDetails);
                      }}
                      description="هل انت متاكد؟ سيتم حذف الصنف"
                      successMessage={`تم حذف ${order.productDetails.name} بنجاح`}
                      submitBtnTitle="حذف"
                      btnStyle="btn btn-hov"
                    />
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

export default AdditionPermission;
