import { useState } from "react";
import AddandEditVendor from "../components/modals/AddandEditVendor";
import ChooseVendor from "../components/modals/ChooseVendor";
import CustomModal from "../components/CustomModal";
import { printerSvg, resetSvg, saveSvg } from "../svgs/pageContentSVGs";
import DangerPopup from "../components/modals/DangerPopup";
import { useDispatch, useSelector } from "react-redux";
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
import {
  resetAddPermission,
  setAddPermissionInvoiceInfo,
  setAddPermissionOrders,
} from "../features/addPermissionSlice";

function AdditionPermission() {
  const [loading, setLoading] = useState(false);
  const { show, handleClose, handleShow } = useModal();
  const {
    chosenVendor,
    addPermissionOrders,
    addPermissionInvoiceInfo,
  } = useSelector((state) => state.addPermission);
  const dispatch = useDispatch();

  const removeProductHandler = (currentProduct) => {
    setLoading(true);
    dispatch(
      setAddPermissionOrders(
        addPermissionOrders.filter(
          (product) => product._id !== currentProduct._id
        )
      )
    );
    toastFire("success", `تم حذف ${currentProduct.name} بنجاح`);
    setLoading(false);
  };

  const resetHandler = () => {
    setLoading(true);
    dispatch(resetAddPermission());
    toastFire("success", "تمت إعادة تهيئة البيانات بنجاح");
    setLoading(false);
  };

  const submitHandler = async () => {
    setLoading(true);
    await dispatch(
      addTransaction({
        transactionType: "buy",
        products: addPermissionOrders,
        customerDetails: chosenVendor,
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(
          setAddPermissionInvoiceInfo({
            invoiceNumber: res.invoiceNumber,
            createdAt: convertDateFormat(res.createdAt),
          })
        );
      });
    for (const order of addPermissionOrders) {
      await dispatch(
        editProduct({
          ...order,
          quantity:
            (parseInt(order.originalQuantity) || 0) + parseInt(order.quantity),
        })
      );
    }
    toastFire("success", "تم حفظ البيانات بنجاح");
    setLoading(false);
  };

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
          <p>
            تحرير في :{" "}
            {addPermissionInvoiceInfo !== null
              ? addPermissionInvoiceInfo.createdAt
              : ""}
          </p>
        </div>
        <div className="text-center text-md-end d-print-none">
          {chosenVendor
            ? `اسم المورد : ${chosenVendor.name}`
            : "الرجاء اختيار المورد"}
        </div>
        <div className="d-flex d-print-none gap-3 w-sm-100 flex-column flex-sm-row flex-grow-1 justify-content-end">
          {!chosenVendor && (
            <>
              <ChooseVendor />
              <AddandEditVendor btnTitle="إضافة مورد جديد" />
            </>
          )}
          {chosenVendor && (
            <>
              {!addPermissionInvoiceInfo && (
                <>
                  <ChooseProductToBuy />
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

              {addPermissionInvoiceInfo && (
                <MainButton
                  btnIcon={printerSvg}
                  clickHandler={handlePrint}
                  btnTitle="طباعة"
                />
              )}

              {addPermissionOrders.length > 0 && !addPermissionInvoiceInfo && (
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
        ) : addPermissionOrders.length > 0 ? (
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
                <CustomTable.Data body="الاجمالى" last={addPermissionInvoiceInfo} />
                {!addPermissionInvoiceInfo && (
                  <CustomTable.Data body="إجراءات" last />
                )}
              </CustomTable.Row>
            </thead>
            <tbody>
              {addPermissionOrders.length > 0 &&
                addPermissionOrders.map((order, index, arr) => (
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
                    <CustomTable.Data
                      body={order.totalPrice}
                      last={addPermissionInvoiceInfo}
                    />
                    {!addPermissionInvoiceInfo && (
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
      <p className="mt-4 d-none d-print-block fw-bold fs-6">
        رقم الاذن:{" "}
        {addPermissionInvoiceInfo !== null
          ? addPermissionInvoiceInfo.invoiceNumber
          : ""}
      </p>
      <p className="mt-3 d-none d-print-block fw-bold fs-6">التوقيع:</p>
    </>
  );
}

export default AdditionPermission;
