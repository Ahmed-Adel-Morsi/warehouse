import { Link } from "react-router-dom";
import homeVector from "../assets/homeVector.svg";
function Home() {
  return (
    <>
      <h1 className="fw-boldest text-center text-lg-end mb-3 mb-md-5">
        الصفحة الرئيسية
      </h1>
      <div className="d-flex justify-content-between gap-3 flex-column flex-lg-row align-items-center rounded p-3 p-lg-5 bg-light">
        <img
          src={homeVector}
          style={{ width: "15rem" }}
          className="order-lg-1 mw-100"
          alt="home Page Vector"
        />
        <div className="text-center order-lg-0">
          <h2 className="mb-3 fw-medium">النسخة التجريبية للبرنامج</h2>
          <Link
            to="/products"
            className="btn btn-dark fs-small py-2 px-3 fw-medium"
          >
            بدء الاستخدام
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
