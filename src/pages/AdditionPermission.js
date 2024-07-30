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
import { removeSvg } from "../svgs/actionsSVGs";
import { toastFire } from "../utils/toastFire";
import { Modal } from "react-bootstrap";
import MainButton from "../components/MainButton";
import useModal from "../hooks/useModal";

function AdditionPermission() {
  const [loading, setLoading] = useState(false);
  const [chosenProductToBuy, setChosenProductToBuy] = useState(null);
  const { show, handleClose, handleShow } = useModal();
  const [ordersIds, setOrdersIds] = useState([]);
  const [chosenVendor, setChosenVendor] = useState(() => {
    const savedVendor = localStorage.getItem("chosenVendor");
    return savedVendor ? JSON.parse(savedVendor) : null;
  });
  const [additionPermissionOrders, setAdditionPermissionOrders] = useState(
    () => {
      const savedProducts = localStorage.getItem("additionPermissionOrders");
      return savedProducts ? JSON.parse(savedProducts) : [];
    }
  );
  const dispatch = useDispatch();

  const removeProductHandler = (currentProduct) => {
    setLoading(true);
    const savedProducts = JSON.parse(
      localStorage.getItem("additionPermissionOrders")
    );
    setAdditionPermissionOrders(
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
    setChosenVendor(null);
    setChosenProductToBuy(null);
    setAdditionPermissionOrders([]);
    setOrdersIds([]);
    toastFire("success", "تمت إعادة تهيئة البيانات بنجاح");
    setLoading(false);
  };

  const submitHandler = async () => {
    setLoading(true);
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
    toastFire("success", "تم حفظ البيانات بنجاح");
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (chosenVendor !== null) {
      localStorage.setItem("chosenVendor", JSON.stringify(chosenVendor));
    } else {
      localStorage.removeItem("chosenVendor");
    }
    setLoading(false);
  }, [chosenVendor]);

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

  useEffect(() => {
    additionPermissionOrders.forEach((e) => {
      setOrdersIds((prev) => [...prev, e.productDetails._id]);
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
                btnTitle="إعادة تهيئة"
                btnIcon={resetSvg}
                title="إعادة تهيئة البيانات"
                description="هل أنت متأكد؟ سيتم إعادة تهيئة البيانات، إذا كنت ترغب في
                الاحتفاظ بالبيانات، يُرجى الضغط على 'حفظ' قبل إعادة التهيئة."
                confirmBtnTitle="إعادة تهيئة"
                loadingState={loading}
                handler={resetHandler}
              />
              {additionPermissionOrders.length > 0 && (
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
        ) : additionPermissionOrders.length > 0 ? (
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
              {additionPermissionOrders.map((order, index, arr) => (
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

export default AdditionPermission;
