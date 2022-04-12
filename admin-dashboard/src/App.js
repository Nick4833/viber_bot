import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Products from "./components/products";
import Sidebar from "./components/sidebar";
import AddProduct from "./components/addproduct";
import EditProduct from "./components/editproduct";
import Orders from "./components/orders";
import Cart from "./components/cart";

function App() {
  const location = useLocation();
  return (
    <>
      <div className="flex gap-x-5">
        {location.pathname !== "/cart" && <Sidebar />}
        <div className="w-full xl:block grid justify-items-center">
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
      {/* <div className=" gap-x-5">
        <h1 className="mt-10 mb-10 text-2xl font-semibold">
          Welcome, Ank Maw Khon
          <br></br>
          <small className="font-normal text-sm text-gray-600">
            Here's what happening in your shop today.
          </small>
        </h1>
        Home
      </div> */}
    </>
  );
}

export default App;
