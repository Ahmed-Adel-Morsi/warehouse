import { useEffect, useState } from "react";
import AddandEditCustomer from "../components/modals/AddandEditCustomer";
import ChooseCustomer from "../components/modals/ChooseCustomer";
import CustomModal from "../components/CustomModal";
import { resetSvg, saveSvg } from "../svgs/pageContentSVGs";
import ChooseProduct from "../components/modals/ChooseProduct";
import DangerPopup from "../components/modals/DangerPopup";

function SoldPermission() {
  const [loading, setLoading] = useState(false);

  const removeProductHandler = async (currentProduct) => {
    try {
      const savedProducts = JSON.parse(localStorage.getItem("orderedProducts"));
      setOrderedProducts(
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
    setOrderedProducts([]);
    return true;
  };

  const [chosenCustomer, setChosenCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem("chosenCustomer");
    return savedCustomer ? JSON.parse(savedCustomer) : null;
  });

  const [chosenProduct, setChosenProduct] = useState(() => {
    const savedProduct = localStorage.getItem("chosenProduct");
    return savedProduct ? JSON.parse(savedProduct) : null;
  });

  const [orderedProducts, setOrderedProducts] = useState(() => {
    const savedProducts = localStorage.getItem("orderedProducts");
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
    if (orderedProducts.length > 0) {
      localStorage.setItem("orderedProducts", JSON.stringify(orderedProducts));
    } else {
      localStorage.removeItem("orderedProducts");
    }
    setLoading(false);
  }, [orderedProducts]);

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
              <ChooseCustomer setChosenCustomer={setChosenCustomer} />
              <AddandEditCustomer newCustomer={true} />
            </>
          )}
          {chosenCustomer && (
            <>
              <ChooseProduct
                setChosenProduct={setChosenProduct}
                setOrderedProducts={setOrderedProducts}
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
                  submitHandler={() => {
                    return true;
                  }}
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
        ) : orderedProducts.length > 0 ? (
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
                <td className="fs-small fw-medium text-center p-3">إجراءات</td>
              </tr>
            </thead>
            <tbody>
              {orderedProducts.map((product, index, arr) => (
                <tr
                  key={product.id}
                  className={index !== arr.length - 1 ? "border-bottom" : ""}
                >
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.name || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.code || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.brand || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.size || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.color || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.quantity || "-"}
                  </td>
                  <td className="border-start fs-small fw-medium text-center p-3">
                    {product.price || "-"}
                  </td>
                  <td className="fs-small h-100 d-flex justify-content-center">
                    <DangerPopup
                      notRemove={true}
                      title="حذف الصنف"
                      handler={async () => {
                        await removeProductHandler(product);
                      }}
                      description="هل انت متاكد؟ سيتم حذف الصنف"
                      successMessage={`تم حذف ${product.name} بنجاح`}
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
