import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import ThemeDropdown from "./ThemeDropdown";
import {
  addInvSvg,
  addPerSvg,
  customersSvg,
  homeSvg,
  logoutSvg,
  productsSvg,
  soldInvSvg,
  soldPerSvg,
  transactionsSvg,
  vendorsSvg,
} from "../svgs/sidebarSVGs";
import DangerPopup from "./modals/DangerPopup";
import SidebarButton from "./SidebarButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import MainButton from "./MainButton";
import { ROUTES } from "../routes/routes";

function Sidebar({ forOffcanvas, closeHandler }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  const logoutHandler = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
      return true;
    } catch (error) {
      return false;
    }
  };

  const closeNavbar = () => {
    if (closeHandler) closeHandler();
  };

  return (
    <>
      {![ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname) && (
        <div
          className={`p-3 overflow-y-auto flex-shrink-0 sidebar ${
            forOffcanvas
              ? "d-flex h-100"
              : "d-none d-lg-flex vh-100 border-start"
          } flex-column`}
        >
          {!forOffcanvas && (
            <>
              <Link
                to="/"
                className="navbar-brand text-center fs-4 fw-boldest text-theme-color"
              >
                Warehouse
              </Link>
              <hr className="m-3" />
            </>
          )}
          <div className="list-group flex-grow-1 mb-3">
            {token ? (
              <>
                <SidebarButton
                  NavTo="/"
                  title="الصفحة الرئيسية"
                  icon={homeSvg}
                  onClick={closeNavbar}
                />
                <SidebarButton
                  NavTo="/products"
                  title="ارصدة المخزن"
                  icon={productsSvg}
                  onClick={closeNavbar}
                />
                <SidebarButton
                  NavTo="/customers"
                  title="العملاء"
                  icon={customersSvg}
                  onClick={closeNavbar}
                />
                <SidebarButton
                  NavTo="/vendors"
                  title="الموردين"
                  icon={vendorsSvg}
                  onClick={closeNavbar}
                />
                <SidebarButton
                  NavTo="/transactions"
                  title="حركة الاصناف"
                  icon={transactionsSvg}
                  onClick={closeNavbar}
                />
                <SidebarButton
                  NavTo="/sold-permission"
                  title="إذن بيع"
                  icon={soldPerSvg}
                  onClick={closeNavbar}
                />
                <SidebarButton
                  NavTo="/addition-permission"
                  title="إذن اضافة"
                  icon={addPerSvg}
                  onClick={closeNavbar}
                />
                <SidebarButton
                  NavTo="/sold-invoices"
                  title="فواتير البيع"
                  icon={soldInvSvg}
                  onClick={closeNavbar}
                />
                <SidebarButton
                  NavTo="/addition-invoices"
                  title="فواتير الإضافة"
                  icon={addInvSvg}
                  onClick={closeNavbar}
                />
              </>
            ) : (
              <MainButton
                btnTitle="تسجيل الدخول"
                clickHandler={() => navigate("/login")}
              />
            )}
          </div>

          <div className="list-group">
            {!forOffcanvas && (
              <ThemeDropdown forNavbar={false}>تبديل الثيم</ThemeDropdown>
            )}
            {token && (
              <DangerPopup
                notRemove={true}
                btnStyle="list-group-item my-1 list-group-item-action d-flex align-items-center gap-2 p-2 fs-small fw-medium rounded border-0 btn-hov text-theme-color"
                buttonTitle="تسجيل الخروج"
                title="تسجيل الخروج"
                icon={logoutSvg}
                handler={logoutHandler}
                description="هل انت متاكد؟ سيتم تسجيل الخروج نهائياً"
                submitBtnTitle="تسجيل الخروج"
                successMessage="تم تسجيل الخروج بنجاح"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
