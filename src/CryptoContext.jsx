import React, { createContext, useContext, useEffect, useState } from "react";

export const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");
  const [reflesh, setReflesh] = useState();

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{ currency, setCurrency, symbol, setSymbol, reflesh, setReflesh }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
