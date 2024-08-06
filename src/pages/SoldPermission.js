import { useState } from "react";
import AddandEditCustomer from "../components/modals/AddandEditCustomer";
import ChooseCustomer from "../components/modals/ChooseCustomer";
import CustomModal from "../components/CustomModal";
import { printerSvg, resetSvg, saveSvg } from "../svgs/pageContentSVGs";
import ChooseProductToSell from "../components/modals/ChooseProductToSell";
import DangerPopup from "../components/modals/DangerPopup";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../features/transactionsSlice";
import { editProduct } from "../features/productsSlice";
import { Row, Data } from "../components/CustomTable";
import PageHeader from "../components/PageHeader";
import { toastFire } from "../utils/toastFire";
import { removeSvg } from "../svgs/actionsSVGs";
import MainButton from "../components/MainButton";
import { Modal } from "react-bootstrap";
import useModal from "../hooks/useModal";
import handlePrint from "../utils/handlePrint";
import convertDateFormat from "../utils/convertDateFormat";
import {
  resetSoldPermission,
  setSoldPermissionInvoiceInfo,
  setSoldPermissionOrders,
} from "../features/soldPermissionSlice";
import TableSection from "../components/TableSection";

function SoldPermission() {
  const [loading, setLoading] = useState(false);
  const { show, handleClose, handleShow } = useModal();
  const { chosenCustomer, soldPermissionOrders, soldPermissionInvoiceInfo } =
    useSelector((state) => state.soldPermission);
  const dispatch = useDispatch();

  const removeProductHandler = (currentProduct) => {
    setLoading(true);
    dispatch(
      setSoldPermissionOrders(
        soldPermissionOrders.filter(
          (product) => product._id !== currentProduct._id
        )
      )
    );
    toastFire("success", `تم حذف ${currentProduct.name} بنجاح`);
    setLoading(false);
  };

  const resetHandler = () => {
    setLoading(true);
    dispatch(resetSoldPermission());
    toastFire("success", "تمت إعادة تهيئة البيانات بنجاح");
    setLoading(false);
  };

  const submitHandler = async () => {
    try {
      setLoading(true);

      const transactionResponse = await dispatch(
        addTransaction({
          transactionType: "sell",
          products: soldPermissionOrders,
          customerDetails: chosenCustomer,
        })
      ).unwrap();

      dispatch(
        setSoldPermissionInvoiceInfo({
          invoiceNumber: transactionResponse.invoiceNumber,
          createdAt: convertDateFormat(transactionResponse.createdAt),
        })
      );

      for (const order of soldPermissionOrders) {
        await dispatch(
          editProduct({
            ...order,
            quantity:
              parseInt(order.originalQuantity) - parseInt(order.quantity),
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
      <PageHeader>إذن بيع</PageHeader>
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 fw-semibold">
        <div className="d-none d-print-block fw-bold fs-6 align-self-start">
          <p>
            {chosenCustomer
              ? `اسم العميل : ${chosenCustomer.name}`
              : "الرجاء اختيار العميل"}
          </p>
          <p>
            تحرير في :{" "}
            {soldPermissionInvoiceInfo !== null
              ? soldPermissionInvoiceInfo.createdAt
              : ""}
          </p>
        </div>
        <div className="text-center text-md-end d-print-none">
          {chosenCustomer
            ? `اسم العميل : ${chosenCustomer.name}`
            : "الرجاء اختيار العميل"}
        </div>
        <div className="d-flex d-print-none gap-3 w-sm-100 flex-column flex-sm-row flex-grow-1 justify-content-end">
          {!chosenCustomer && (
            <>
              <ChooseCustomer />
              <AddandEditCustomer btnTitle="إضافة عميل جديد" />
            </>
          )}
          {chosenCustomer && (
            <>
              {!soldPermissionInvoiceInfo && <ChooseProductToSell />}

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

              {soldPermissionInvoiceInfo && (
                <MainButton
                  btnIcon={printerSvg}
                  clickHandler={handlePrint}
                  btnTitle="طباعة"
                />
              )}
              {soldPermissionOrders.length > 0 &&
                !soldPermissionInvoiceInfo && (
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
        dataLength={soldPermissionOrders.length}
        pageName={
          soldPermissionInvoiceInfo ? "submittedPermission" : "permission"
        }
      >
        {soldPermissionOrders.map((order, index, arr) => (
          <Row key={order._id} last={index === arr.length - 1}>
            <Data body={order.name} />
            <Data body={order.code} />
            <Data body={order.brand} />
            <Data body={order.size} />
            <Data body={order.color} />
            <Data body={order.quantity} />
            <Data body={order.price} />
            <Data body={order.totalPrice} last={soldPermissionInvoiceInfo} />
            {!soldPermissionInvoiceInfo && (
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
        {soldPermissionInvoiceInfo !== null
          ? soldPermissionInvoiceInfo.invoiceNumber
          : ""}
      </p>
      <p className="mt-3 d-none d-print-block fw-bold fs-6">التوقيع:</p>
    </>
  );
}

export default SoldPermission;
