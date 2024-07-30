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
import { toastFire } from "../utils/toastFire";
import { removeSvg } from "../svgs/actionsSVGs";
import MainButton from "../components/MainButton";
import { Modal } from "react-bootstrap";
import useModal from "../hooks/useModal";

function SoldPermission() {
  const [loading, setLoading] = useState(false);
  const [chosenProductToSell, setChosenProductToSell] = useState(null);
  const { show, handleClose, handleShow } = useModal();
  const [ordersIds, setOrdersIds] = useState([]);
  const [chosenCustomer, setChosenCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem("chosenCustomer");
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });
  const [soldPermissionOrders, setSoldPermissionOrders] = useState(() => {
    const savedProducts = localStorage.getItem("soldPermissionOrders");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const dispatch = useDispatch();

  const removeProductHandler = (currentProduct) => {
    setLoading(true);
    const savedProducts = JSON.parse(
      localStorage.getItem("soldPermissionOrders")
    );
    setSoldPermissionOrders(
      savedProducts.filter(
        (product) => product.productDetails._id !== currentProduct._id
      )
    );
    setOrdersIds(ordersIds.filter((id) => id !== currentProduct._id));
    toastFire("success", `تم حذف ${currentProduct.name} بنجاح`);
    setLoading(false);
  };

  const resetHandler = () => {
    setLoading(true);
    setChosenCustomer(null);
    setChosenProductToSell(null);
    setSoldPermissionOrders([]);
    setOrdersIds([]);
    toastFire("success", "تمت إعادة تهيئة البيانات بنجاح");
    setLoading(false);
  };

  const submitHandler = async () => {
    setLoading(true);
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
    toastFire("success", "تم حفظ البيانات بنجاح");
    setLoading(false);
  };

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

  useEffect(() => {
    soldPermissionOrders.forEach((e) => {
      setOrdersIds((prev) => [...prev, e.productDetails._id]);
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
                btnTitle="إعادة تهيئة"
                btnIcon={resetSvg}
                title="إعادة تهيئة البيانات"
                description="هل أنت متأكد؟ سيتم إعادة تهيئة البيانات، إذا كنت ترغب في
                الاحتفاظ بالبيانات، يُرجى الضغط على 'حفظ' قبل إعادة التهيئة."
                confirmBtnTitle="إعادة تهيئة"
                loadingState={loading}
                handler={resetHandler}
              />
              {soldPermissionOrders.length > 0 && (
                <>
                  <MainButton
                    btnTitle="حفظ"
                    btnIcon={saveSvg}
                    clickHandler={handleShow}
                  />

                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    centered
                  >
                    <CustomModal handleClose={handleClose}>
                      <CustomModal.Header
                        title="حفظ البيانات"
                        description="يرجي تأكيد حفظ البيانات"
                      />
                      <CustomModal.Footer
                        confirmBtnTitle="حفظ"
                        clickHandler={submitHandler}
                        loadingState={loading}
                      />
                    </CustomModal>
                  </Modal>
                </>
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
              <CustomTable.Row header>
                <CustomTable.Data body="اسم الصنف" />
                <CustomTable.Data body="الكود" />
                <CustomTable.Data body="الماركة" />
                <CustomTable.Data body="الحجم" />
                <CustomTable.Data body="اللون" />
                <CustomTable.Data body="العدد" />
                <CustomTable.Data body="السعر" />
                <CustomTable.Data body="الاجمالى" />
                <CustomTable.Data body="إجراءات" last />
              </CustomTable.Row>
            </thead>
            <tbody>
              {soldPermissionOrders.map((order, index, arr) => (
                <CustomTable.Row
                  key={order.productDetails._id}
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
                        btnStyle="btn btn-hov"
                        btnIcon={removeSvg}
                        title="حذف الصنف"
                        description="هل انت متاكد؟ سيتم حذف الصنف"
                        confirmBtnTitle="حذف"
                        loadingState={loading}
                        handler={() => {
                          removeProductHandler(order.productDetails);
                        }}
                      />
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

export default SoldPermission;
