import { useNavigate } from "react-router-dom";
import homeVector from "../assets/homeVector.svg";
import PageHeader from "../components/PageHeader";
import MainButton from "../components/MainButton";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader>الصفحة الرئيسية</PageHeader>
      <div className="d-flex justify-content-between gap-3 flex-column flex-lg-row align-items-center rounded p-3 p-lg-5 bg-hov-color">
        <img
          src={homeVector}
          style={{ width: "15rem" }}
          className="order-lg-1 mw-100"
          alt="home Page Vector"
        />
        <div className="text-center order-lg-0">
          <h2 className="mb-3 fw-medium">النسخة التجريبية للبرنامج</h2>
          <div className="d-flex justify-content-center">
            <MainButton
              btnTitle="بدء الاستخدام"
              clickHandler={() => {
                navigate("/products");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
