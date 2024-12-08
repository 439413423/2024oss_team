import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShowList from "./Pages/ShowList";
import CartList from "./Pages/CartList";
import Detail from "./Pages/Detail";
import RentalList from "./User/RentalList";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/home" element={<ShowList />} />
        <Route path="/book" element={<Detail />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/rental" element={<RentalList />} />
      </Routes>
    </BrowserRouter>
  );
}
