import { Link } from "react-router-dom";
import ThemeDropdown from "./ThemeDropdown";
import Sidebar from "./Sidebar";
import { hamburgerSvg } from "../svgs/navbarSVGs";
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="d-block d-lg-none navbar navbar-expand-lg bg-body-white py-2 px-3 border-bottom d-print-none">
      <div className="container-fluid p-0">
        <button
          className="navbar-toggler border-0 p-2 btn-hov"
          type="button"
          onClick={handleShow}
        >
          {hamburgerSvg}
        </button>

        <Link to="/" className="navbar-brand fs-4 fw-boldest m-0">
          Warehouse
        </Link>
        <ThemeDropdown forNavbar={true} />
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="overflow-y-auto w-fit border-start"
        >
          <Offcanvas.Header className="justify-content-between">
            <Offcanvas.Title className="fw-medium fs-6">
              إدارة المخزن
            </Offcanvas.Title>
            <button
              type="button"
              className="btn-close fs-smallest rounded border m-0"
              onClick={handleClose}
            ></button>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Sidebar forOffcanvas={true} closeHandler={handleClose} />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
}
export default Navbar;
