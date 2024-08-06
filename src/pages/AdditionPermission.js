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
import { Row, Data } from "../components/CustomTable";
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
import TableSection from "../components/TableSection";

function AdditionPermission() {
  const [loading, setLoading] = useState(false);
  const { show, handleClose, handleShow } = useModal();
  const { chosenVendor, addPermissionOrders, addPermissionInvoiceInfo } =
    useSelector((state) => state.addPermission);
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
    try {
      setLoading(true);

      const transactionResponse = await dispatch(
        addTransaction({
          transactionType: "buy",
          products: addPermissionOrders,
          customerDetails: chosenVendor,
        })
      ).unwrap();

      dispatch(
        setAddPermissionInvoiceInfo({
          invoiceNumber: transactionResponse.invoiceNumber,
          createdAt: convertDateFormat(transactionResponse.createdAt),
        })
      );

      for (const order of addPermissionOrders) {
        await dispatch(
          editProduct({
            ...order,
            quantity:
              (parseInt(order.originalQuantity) || 0) +
              parseInt(order.quantity),
          })
        );
      }

      toastFire("success", "تم حفظ البيانات بنجاح");
    } catch (error) {
      toastFire("error", "حدث خطأ أثناء حفظ البيانات");
    } finally {
      setLoading(false);
    }
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
      <TableSection
        loading={loading}
        dataLength={addPermissionOrders.length}
        pageName={
          addPermissionInvoiceInfo ? "submittedPermission" : "permission"
        }
      >
        {addPermissionOrders.map((order, index, arr) => (
          <Row key={order._id} last={index === arr.length - 1}>
            <Data body={order.name} />
            <Data body={order.code} />
            <Data body={order.brand} />
            <Data body={order.size} />
            <Data body={order.color} />
            <Data body={order.quantity} />
            <Data body={order.price} />
            <Data body={order.totalPrice} last={addPermissionInvoiceInfo} />
            {!addPermissionInvoiceInfo && (
              <Data
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
          </Row>
        ))}
      </TableSection>
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
