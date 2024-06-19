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
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import PageHeader from "../components/PageHeader";

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
      setOrdersIds(ordersIds.filter((id) => id !== currentProduct.id));
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
    setOrdersIds([]);
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

  const [ordersIds, setOrdersIds] = useState([]);

  useEffect(() => {
    additionPermissionOrders.forEach((e) => {
      setOrdersIds((prev) => [...prev, e.productDetails.id]);
    });
  }, [additionPermissionOrders]);

  return (
    <>
      <PageHeader>إذن اضافة</PageHeader>
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 fw-semibold">
        <div className="text-center text-md-end">
          {chosenVendor
            ? `اسم المورد : ${chosenVendor.name}`
            : "الرجاء اختيار المورد"}
        </div>
        <div className="d-flex gap-3 w-sm-100 flex-column flex-sm-row flex-grow-1 justify-content-end">
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
                ordersIds={ordersIds}
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
      <TableContainer>
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : additionPermissionOrders.length > 0 ? (
          <CustomTable>
            <thead>
              <CustomTable.Row header={true}>
                <CustomTable.Data body="اسم الصنف" />
                <CustomTable.Data body="الكود" />
                <CustomTable.Data body="الماركة" />
                <CustomTable.Data body="الحجم" />
                <CustomTable.Data body="اللون" />
                <CustomTable.Data body="العدد" />
                <CustomTable.Data body="السعر" />
                <CustomTable.Data body="الاجمالى" />
                <CustomTable.Data body="إجراءات" last={true} />
              </CustomTable.Row>
            </thead>
            <tbody>
              {additionPermissionOrders.map((order, index, arr) => (
                <CustomTable.Row
                  key={order.productDetails.id}
                  last={index === arr.length - 1}
                >
                  <CustomTable.Data body={order.productDetails.name} />
                  <CustomTable.Data body={order.productDetails.code} />
                  <CustomTable.Data body={order.productDetails.brand} />
                  <CustomTable.Data body={order.productDetails.size} />
                  <CustomTable.Data body={order.productDetails.color} />
                  <CustomTable.Data body={order.quantity} />
                  <CustomTable.Data body={order.price} />
                  <CustomTable.Data body={order.totalPrice} />
                  <CustomTable.Data
                    body={
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

export default AdditionPermission;
