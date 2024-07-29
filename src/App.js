import { Outlet, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes/routes";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
import Transactions from "./pages/Transactions";
import SoldPermission from "./pages/SoldPermission";
import AdditionPermission from "./pages/AdditionPermission";
import SoldInvoices from "./pages/SoldInvoices";
import AdditionInvoices from "./pages/AdditionInvoices";
import ItemDetails from "./pages/ItemDetails";
import InvoiceDetails from "./pages/InvoiceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route element={<ProtectedRoute />}>
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
            <Route path={ROUTES.SOLD_INVOICES} element={<Outlet />}>
              <Route path="" element={<SoldInvoices />} />
              <Route
                path={ROUTES.INVOICE_DETAILS}
                element={<InvoiceDetails type="sell" />}
              />
            </Route>
            <Route path={ROUTES.ADDITION_INVOICES} element={<Outlet />}>
              <Route path="" element={<AdditionInvoices />} />
              <Route
                path={ROUTES.INVOICE_DETAILS}
                element={<InvoiceDetails type="buy" />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
