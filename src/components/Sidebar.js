import React from "react";
import { Link, NavLink } from "react-router-dom";
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

function Sidebar(props) {
  return (
    <div
      className={`p-3 overflow-y-auto flex-shrink-0 sidebar ${
        props.forOffcanvas
          ? "d-flex h-100"
          : "d-none d-lg-flex vh-100 border-start"
      } flex-column`}
    >
      {!props.forOffcanvas && (
        <>
          <Link to="/" className="navbar-brand text-center fs-4 fw-boldest">
            Warehouse
          </Link>
          <hr className="m-3" />
        </>
      )}
      <div className="list-group flex-grow-1">
        <NavLink
          to="/"
          className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {homeSvg}
          الصفحة الرئيسية
        </NavLink>
        <NavLink
          to="/products"
          className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {productsSvg}
          ارصدة المخزن
        </NavLink>
        <NavLink
          to="/customers"
          className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {customersSvg}
          العملاء
        </NavLink>
        <NavLink
          to="/vendors"
          className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {vendorsSvg}
          الموردين
        </NavLink>
        <NavLink
          to="/transactions"
          className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {transactionsSvg}
          حركة الاصناف
        </NavLink>
        <NavLink
          to="/sold-permission"
          className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {soldPerSvg}
          إذن بيع
        </NavLink>
        <NavLink
          to="/addition-permission"
          className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {addPerSvg}
          إذن اضافة
        </NavLink>
        <NavLink
          to="/sold-invoices"
          className="list-group-item mb-1 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {soldInvSvg}
          فواتير البيع
        </NavLink>
        <NavLink
          to="/addition-invoices"
          className="list-group-item mb-3 list-group-item-action d-flex align-items-center gap-2 fw-semibold p-2 rounded border-0"
        >
          {addInvSvg}
          فواتير الإضافة
        </NavLink>
      </div>
      <div className="list-group">
        {!props.forOffcanvas && (
          <ThemeDropdown forNavbar={false}>تبديل الثيم</ThemeDropdown>
        )}
        <button className="list-group-item my-1 list-group-item-action d-flex align-items-center gap-2 p-2 fs-small rounded border-0">
          {logoutSvg}
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
