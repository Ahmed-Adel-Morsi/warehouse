import { useEffect, useState } from "react";
import AddandEditVendor from "../components/modals/AddandEditVendor";
import ChooseVendor from "../components/modals/ChooseVendor";
import CustomModal from "../components/CustomModal";
import { printerSvg, resetSvg, saveSvg } from "../svgs/pageContentSVGs";
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
import handlePrint from "../utils/handlePrint";
import convertDateFormat from "../utils/convertDateFormat";

function AdditionPermission() {
  const [loading, setLoading] = useState(false);
  const [chosenProductToBuy, setChosenProductToBuy] = useState(null);
  const { show, handleClose, handleShow } = useModal();
  const [ordersIds, setOrdersIds] = useState([]);
  const [addPermissionInvoiceInfo, setAddPermissionInvoiceInfo] = useState(
    () => {
      const savedInvoiceInfo = localStorage.getItem("addPermissionInvoiceInfo");
      return savedInvoiceInfo ? JSON.parse(savedInvoiceInfo) : null;
    }
  );
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
  const [submitted, setSubmitted] = useState(() => {
    const additionPermissionSaved = localStorage.getItem(
      "additionPermissionSaved"
    );
    return additionPermissionSaved
      ? JSON.parse(additionPermissionSaved)
      : false;
  });
  const dispatch = useDispatch();

  const removeProductHandler = (currentProduct) => {
    setLoading(true);
    const savedProducts = JSON.parse(
      localStorage.getItem("additionPermissionOrders")
    );
    setAdditionPermissionOrders(
      savedProducts.filter((product) => product._id !== currentProduct._id)
    );
    setOrdersIds(ordersIds.filter((id) => id !== currentProduct._id));
    toastFire("success", `تم حذف ${currentProduct.name} بنجاح`);
    setLoading(false);
  };

  const resetHandler = () => {
    setLoading(true);
    setSubmitted(false);
    setAddPermissionInvoiceInfo(null);
    setChosenVendor(null);
    setChosenProductToBuy(null);
    setAdditionPermissionOrders([]);
    setOrdersIds([]);
    toastFire("success", "تمت إعادة تهيئة البيانات بنجاح");
    setLoading(false);
  };

  const submitHandler = async () => {
    setLoading(true);
    await dispatch(
      addTransaction({
        transactionType: "buy",
        products: additionPermissionOrders,
        customerDetails: chosenVendor,
      })
    )
      .unwrap()
      .then((res) => {
        setAddPermissionInvoiceInfo({
          invoiceNumber: res.invoiceNumber,
          createdAt: convertDateFormat(res.createdAt),
        });
      });
    for (const order of additionPermissionOrders) {
      await dispatch(
        editProduct({
          ...order,
          quantity:
            (parseInt(order.originalQuantity) || 0) + parseInt(order.quantity),
        })
      );
    }
    setSubmitted(true);
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
    if (addPermissionInvoiceInfo !== null) {
      localStorage.setItem("addPermissionInvoiceInfo", JSON.stringify(addPermissionInvoiceInfo));
    } else {
      localStorage.removeItem("addPermissionInvoiceInfo");
    }
  }, [addPermissionInvoiceInfo]);

  useEffect(() => {
    localStorage.setItem("additionPermissionSaved", JSON.stringify(submitted));
  }, [submitted]);

  useEffect(() => {
    additionPermissionOrders.forEach((e) => {
      setOrdersIds((prev) => [...prev, e._id]);
    });
  }, [additionPermissionOrders]);

  return (
    <>
      <PageHeader>إذن اضافة</PageHeader>
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 fw-semibold">
        <div className="d-none d-print-block fw-bold fs-6 align-self-start">
          <p>
            {chosenVendor
              ? `اسم المورد : ${chosenVendor.name}`
              : "الرجاء اختيار المورد"}
          </p>
          <p>تحرير في : {addPermissionInvoiceInfo !== null ? addPermissionInvoiceInfo.createdAt : ""}</p>
        </div>
        <div className="text-center text-md-end d-print-none">
          {chosenVendor
            ? `اسم المورد : ${chosenVendor.name}`
            : "الرجاء اختيار المورد"}
        </div>
        <div className="d-flex d-print-none gap-3 w-sm-100 flex-column flex-sm-row flex-grow-1 justify-content-end">
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
              {!submitted && (
                <>
                  <ChooseProductToBuy
                    setChosenProductToBuy={setChosenProductToBuy}
                    setAdditionPermissionOrders={setAdditionPermissionOrders}
                    chosenProductToBuy={chosenProductToBuy}
                    ordersIds={ordersIds}
                  />
                  <AddandEditProduct btnTitle="إضافة صنف جديد" />
                </>
              )}

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

              {submitted && (
                <MainButton
                  btnIcon={printerSvg}
                  clickHandler={handlePrint}
                  btnTitle="طباعة"
                />
              )}

              {additionPermissionOrders.length > 0 && !submitted && (
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
                <CustomTable.Data body="الاجمالى" last={submitted} />
                {!submitted && <CustomTable.Data body="إجراءات" last />}
              </CustomTable.Row>
            </thead>
            <tbody>
              {additionPermissionOrders.map((order, index, arr) => (
                <CustomTable.Row
                  key={order._id}
                  last={index === arr.length - 1}
                >
                  <CustomTable.Data body={order.name} />
                  <CustomTable.Data body={order.code} />
                  <CustomTable.Data body={order.brand} />
                  <CustomTable.Data body={order.size} />
                  <CustomTable.Data body={order.color} />
                  <CustomTable.Data body={order.quantity} />
                  <CustomTable.Data body={order.price} />
                  <CustomTable.Data body={order.totalPrice} last={submitted} />
                  {!submitted && (
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
                            removeProductHandler(order);
                          }}
                        />
                      }
                      last
                    />
                  )}
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
      <p className="mt-4 d-none d-print-block fw-bold fs-6">رقم الاذن: {addPermissionInvoiceInfo !== null ? addPermissionInvoiceInfo.invoiceNumber : ""}</p>
      <p className="mt-3 d-none d-print-block fw-bold fs-6">التوقيع:</p>
    </>
  );
}

export default AdditionPermission;
