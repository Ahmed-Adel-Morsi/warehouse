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
import CustomTable from "../components/CustomTable";
import TableContainer from "../components/TableContainer";
import PageHeader from "../components/PageHeader";

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
      setOrdersIds(ordersIds.filter((id) => id !== currentProduct.id));
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
    setOrdersIds([]);
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

  const [ordersIds, setOrdersIds] = useState([]);

  useEffect(() => {
    soldPermissionOrders.forEach((e) => {
      setOrdersIds((prev) => [...prev, e.productDetails.id]);
    });
  }, [soldPermissionOrders]);

  return (
    <>
      <PageHeader>إذن بيع</PageHeader>
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 fw-semibold">
        <div className="text-center text-md-end">
          {chosenCustomer
            ? `اسم العميل : ${chosenCustomer.name}`
            : "الرجاء اختيار العميل"}
        </div>
        <div className="d-flex gap-3 w-sm-100 flex-column flex-sm-row flex-grow-1 justify-content-end">
          {!chosenCustomer && (
            <>
              <ChooseCustomer
                setChosenCustomer={setChosenCustomer}
                chosenCustomer={chosenCustomer}
              />
              <AddandEditCustomer btnTitle="إضافة عميل جديد" />
            </>
          )}
          {chosenCustomer && (
            <>
              <ChooseProductToSell
                setChosenProductToSell={setChosenProductToSell}
                setSoldPermissionOrders={setSoldPermissionOrders}
                chosenProductToSell={chosenProductToSell}
                ordersIds={ordersIds}
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
      <TableContainer>
        {loading ? (
          <div className="p-4 text-center fs-small fw-medium">
            جارى التحميل...
          </div>
        ) : soldPermissionOrders.length > 0 ? (
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
              {soldPermissionOrders.map((order, index, arr) => (
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

export default SoldPermission;
