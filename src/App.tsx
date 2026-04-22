import { Routes, Route } from "react-router-dom";
import Storefront from "./Storefront";
import AdminLayout from "./admin/components/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Settings from "./admin/pages/Settings";
import Content from "./admin/pages/Content";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Storefront />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
        <Route path="content" element={<Content />} />
      </Route>
    </Routes>
  );
}
