import { Link } from "react-router-dom";
import ThemeDropdown from "./ThemeDropdown";
import Sidebar from "./Sidebar";
import { hamburgerSvg } from "../svgs/navbarSVGs";

function Navbar() {
  return (
    <nav className="d-block d-lg-none navbar navbar-expand-lg bg-body-white py-2 px-3 border-bottom d-print-none">
      <div className="container-fluid p-0">
        <button
          className="navbar-toggler border-0 p-2 btn-hov"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#staticBackdrop"
          aria-controls="staticBackdrop"
        >
          {hamburgerSvg}
        </button>

        <Link to="/" className="navbar-brand fs-4 fw-boldest m-0">
          Warehouse
        </Link>
        <ThemeDropdown forNavbar={true} />
        <div
          className="offcanvas offcanvas-end overflow-y-auto w-fit border-start"
          // data-bs-backdrop="static"
          tabIndex="-1"
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="offcanvas-header justify-content-between">
            <h5
              className="offcanvas-title fw-medium fs-6"
              id="staticBackdropLabel"
            >
              إدارة المخزن
            </h5>
            <button
              type="button"
              className="btn-close fs-smallest rounded border m-0"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <Sidebar forOffcanvas={true} />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
