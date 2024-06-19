import React from "react";
import { Link } from "react-router-dom";
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

function Sidebar({ forOffcanvas }) {
  const logoutHandler = () => true;

  return (
    <>
      <div
        className={`p-3 overflow-y-auto flex-shrink-0 sidebar ${
          forOffcanvas ? "d-flex h-100" : "d-none d-lg-flex vh-100 border-start"
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
        <div className="list-group flex-grow-1">
          <SidebarButton NavTo="/" title="الصفحة الرئيسية" icon={homeSvg} />
          <SidebarButton
            NavTo="/products"
            title="ارصدة المخزن"
            icon={productsSvg}
          />
          <SidebarButton
            NavTo="/customers"
            title="العملاء"
            icon={customersSvg}
          />
          <SidebarButton NavTo="/vendors" title="الموردين" icon={vendorsSvg} />
          <SidebarButton
            NavTo="/transactions"
            title="حركة الاصناف"
            icon={transactionsSvg}
          />
          <SidebarButton
            NavTo="/sold-permission"
            title="إذن بيع"
            icon={soldPerSvg}
          />
          <SidebarButton
            NavTo="/addition-permission"
            title="إذن اضافة"
            icon={addPerSvg}
          />
          <SidebarButton
            NavTo="/sold-invoices"
            title="فواتير البيع"
            icon={soldInvSvg}
          />
          <SidebarButton
            NavTo="/addition-invoices"
            title="فواتير الإضافة"
            icon={addInvSvg}
          />
        </div>
        <div className="list-group">
          {!forOffcanvas && (
            <ThemeDropdown forNavbar={false}>تبديل الثيم</ThemeDropdown>
          )}
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
        </div>
      </div>
    </>
  );
}

export default Sidebar;
