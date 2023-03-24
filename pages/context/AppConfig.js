import React, { useState, createContext, useEffect } from "react";
export const AppConfig = createContext();

export const AppProvider = ({ children }) => {

    const ERC20Check = async (tokenAddress) => {
        const abi = await fetch(`https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${"VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI"}`);
        const data = await abi.json()
        console.log(data.result)
    }

    return (
        <AppConfig.Provider value={{ ERC20Check }}>
            {children}
        </AppConfig.Provider >
    )
}