import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import Homepage from './Pages/HomePage';
import styled from "@emotion/styled";


const AppContainer = styled("div")({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
