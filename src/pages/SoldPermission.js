import { useEffect, useState } from "react";
import AddandEditCustomer from "../components/modals/AddandEditCustomer";
import ChooseCustomer from "../components/modals/ChooseCustomer";
import CustomModal from "../components/CustomModal";
import { resetSvg, saveSvg } from "../svgs/pageContentSVGs";
import ChooseProductToSell from "../components/modals/ChooseProductToSell";
import DangerPopup from "../components/modals/DangerPopup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";
import { editProduct } from "../features/productsSlice";

function SoldPermission() {
  const [loading, setLoading] = useState(false);
  const [chosenProductToSell, setChosenProductToSell] = useState(null);
  const dispatch = useDispatch();

  const removeProductHandler = async (currentProduct) => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem("soldPermissionOrders")
      );
      setSoldPermissionOrders(
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
    setChosenCustomer(null);
    setChosenProductToSell(null);
    setSoldPermissionOrders([]);
    return true;
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      for (const order of soldPermissionOrders) {
        await dispatch(
          addTransaction({
            transactionType: "sell",
            ...order,
            customerDetails: chosenCustomer,
          })
        );
        await dispatch(
          editProduct({
            ...order.productDetails,
            quantity: order.productDetails.quantity - order.quantity,
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

  const [chosenCustomer, setChosenCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem("chosenCustomer");
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });

  useEffect(() => {
    setLoading(true);
    if (chosenCustomer !== null) {
      localStorage.setItem("chosenCustomer", JSON.stringify(chosenCustomer));
    } else {
      localStorage.removeItem("chosenCustomer");
    }
    setLoading(false);
  }, [chosenCustomer]);

  const [soldPermissionOrders, setSoldPermissionOrders] = useState(() => {
    const savedProducts = localStorage.getItem("soldPermissionOrders");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    setLoading(true);
    if (soldPermissionOrders.length > 0) {
      localStorage.setItem(
        "soldPermissionOrders",
        JSON.stringify(soldPermissionOrders)
      );
    } else {
      localStorage.removeItem("soldPermissionOrders");
    }
    setLoading(false);
  }, [soldPermissionOrders]);

  return (
    <>
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 fw-semibold">
        <div className="text-center text-md-end">
          {chosenCustomer
            ? `اسم العميل : ${chosenCustomer.name}`
            : "الرجاء اختيار العميل"}
        </div>
        <div className="d-flex gap-2 w-sm-100 flex-column flex-sm-row flex-grow-1 justify-content-end">
          {!chosenCustomer && (
            <>
              <ChooseCustomer
                setChosenCustomer={setChosenCustomer}
                chosenCustomer={chosenCustomer}
              />
              <AddandEditCustomer btnTitle = "إضافة عميل جديد" />
            </>
          )}
          {chosenCustomer && (
            <>
              <ChooseProductToSell
                setChosenProductToSell={setChosenProductToSell}
                setSoldPermissionOrders={setSoldPermissionOrders}
                chosenProductToSell={chosenProductToSell}
              />
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
              {soldPermissionOrders.length > 0 && (
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
        ) : soldPermissionOrders.length > 0 ? (
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
              {soldPermissionOrders.map((order, index, arr) => (
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

export default SoldPermission;
