import { Outlet, Route, Routes } from "react-router-dom";
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
import { ROUTES } from "./routes/routes";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <div className="App">
      <div className="bg-dark d-none opacity-50 vh-100 vw-100 position-fixed overlay"></div>
      <Navbar />
      <div className="d-flex">
        <Sidebar forOffcanvas={false} />
        <PageContent>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PRODUCTS} element={<Outlet />}>
              <Route path="" element={<Products />} />
              <Route path={ROUTES.PRODUCT_INVOICES} element={<ItemDetails />} />
            </Route>
            <Route path={ROUTES.CUSTOMERS} element={<Customers />} />
            <Route path={ROUTES.VENDORS} element={<Vendors />} />
            <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
            <Route path={ROUTES.SOLD_PERMISSION} element={<SoldPermission />} />
            <Route
              path={ROUTES.ADDITION_PERMISSION}
              element={<AdditionPermission />}
            />
            <Route path={ROUTES.SOLD_INVOICES} element={<SoldInvoices />} />
            <Route
              path={ROUTES.ADDITION_INVOICES}
              element={<AdditionInvoices />}
            />
          </Routes>
        </PageContent>
      </div>
    </div>
  );
}

export default App;
