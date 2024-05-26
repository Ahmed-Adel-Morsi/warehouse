import { useDispatch } from "react-redux";
import { toastFire } from "../../elements/toastFire";

function RemoveItemModal({ itemToDelete, deleteFunction ,title, children }) {
  const dispatch = useDispatch();

  const handleConfirmAction = () => {
    dispatch(deleteFunction(itemToDelete.id));
    toastFire("success", `تم حذف ${itemToDelete.name} بنجاح`);
  };

  return (
    <>
      <div
        className="modal fade"
        id="removeItemModal"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="removeItemModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <div className="modal-header justify-content-between border-0 p-0">
              <h1
                className="modal-title fs-medium fw-semibold"
                id="removeItemModalLabel"
              >
                {title}
              </h1>
              <button
                type="button"
                className="btn-close m-0 fs-smallest"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-body-secondary fs-small text-center text-sm-end my-3 p-0">
              {children}
            </div>
            <div className="modal-footer border-0 p-0">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                إلغاء
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleConfirmAction()}
                data-bs-dismiss="modal"
              >
                {title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemoveItemModal;
