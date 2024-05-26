import { Route, Routes } from "react-router-dom";
import PageContent from "./components/PageContent";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
import Transactions from "./pages/Transactions";
import SoldPermission from "./pages/SoldPermission";
import AdditionPermission from "./pages/AdditionPermission";
import SoldInvoices from "./pages/SoldInvoices";
import AdditionInvoices from "./pages/AdditionInvoices";
import Navbar from "./components/Navbar";
import "./App.css";
import LogoutModal from "./components/modals/LogoutModal";

function App() {
  return (
    <div className="App">
      <LogoutModal />
      <div className="bg-dark d-none opacity-50 vh-100 vw-100 position-fixed overlay"></div>
      <Navbar />
      <div className="d-flex">
        <Sidebar forOffcanvas={false} />
        <PageContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="sold-permission" element={<SoldPermission />} />
            <Route
              path="addition-permission"
              element={<AdditionPermission />}
            />
            <Route path="sold-invoices" element={<SoldInvoices />} />
            <Route path="addition-invoices" element={<AdditionInvoices />} />
          </Routes>
        </PageContent>
      </div>
    </div>
  );
}

export default App;
