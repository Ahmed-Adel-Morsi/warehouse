import { useEffect, useState } from "react";
import AddandEditCustomer from "../components/modals/AddandEditCustomer";
import ChooseCustomer from "../components/modals/ChooseCustomer";
import CustomModal from "../components/CustomModal";
import { resetSvg, saveSvg } from "../svgs/pageContentSVGs";
import ChooseProduct from "../components/modals/ChooseProduct";
import DangerPopup from "../components/modals/DangerPopup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";
import { editProduct } from "../features/productsSlice";

function SoldPermission() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const removeProductHandler = async (currentProduct) => {
    try {
      const savedProducts = JSON.parse(localStorage.getItem("orders"));
      setOrders(
        savedProducts.filter((product) => product.id !== currentProduct.id)
      );
      return true;
    } catch (error) {
      console.error("Failed to delete the Product:", error);
      return false;
    }
  };

  const resetHandler = () => {
    setChosenCustomer(null);
    setChosenProduct(null);
    setOrders([]);
    return true;
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      for (const order of orders) {
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

  const [chosenProduct, setChosenProduct] = useState(() => {
    const savedProduct = localStorage.getItem("chosenProduct");
    return savedProduct ? JSON.parse(savedProduct) : null;
  });

  const [orders, setOrders] = useState(() => {
    const savedProducts = localStorage.getItem("orders");
    return savedProducts ? JSON.parse(savedProducts) : [];
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

  useEffect(() => {
    setLoading(true);
    if (chosenProduct !== null) {
      localStorage.setItem("chosenProduct", JSON.stringify(chosenProduct));
    } else {
      localStorage.removeItem("chosenProduct");
    }
    setLoading(false);
  }, [chosenProduct]);

  useEffect(() => {
    setLoading(true);
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    } else {
      localStorage.removeItem("orders");
    }
    setLoading(false);
  }, [orders]);

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
              <AddandEditCustomer newCustomer={true} />
            </>
          )}
          {chosenCustomer && (
            <>
              <ChooseProduct
                setChosenProduct={setChosenProduct}
                setOrders={setOrders}
                chosenProduct={chosenProduct}
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
            </>
          )}
        </div>
      </div>
      <div className="border rounded mw-100 overflow-x-auto table-container">
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : orders.length > 0 ? (
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
              {orders.map((order, index, arr) => (
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
