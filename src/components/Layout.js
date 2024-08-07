import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PageContent from "./PageContent";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="d-flex vh-100">
        <Sidebar />
        <PageContent>
          <Outlet />
        </PageContent>
      </div>
    </>
  );
}

export default Layout;
