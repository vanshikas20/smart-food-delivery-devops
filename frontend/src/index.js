import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login";
import Admin from "./Admin";
import Customer from "./Customer";
import Checkout from "./Checkout";
import Signup from "./Signup";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);