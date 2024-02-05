import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Public from "./Components/Public";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Weather from "./Components/weather";
import Reset from "./Components/Reset";
import Table from "./Components/Table";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/weather" element={<Weather/>} />
        <Route path="/reset" element={<Reset/>} />
        <Route path="/table" element={<Table/>} />
      </Route>
    </Routes>
  );
};

export default App;
