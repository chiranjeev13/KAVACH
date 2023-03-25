/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable semi */
import React, { useState, createContext, useEffect } from "react";
export const AppConfig = createContext();
import { ethers } from "ethers";
import contrAbi from "../context/abi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";


export const AppProvider = ({ children }) => {
  const [isERC20, setIsERC20] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [totalSupply, setTotalSupply] = useState("");
  const [contractDeployer, setContractDeployer] = useState("");
  const [ownerBalance, setOwnerBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [network, setNetwork] = useState("Network");
  const [riskFactor, setRiskFactor] = useState(0.0);
  // web3 provider
  const abi = contrAbi.abi;
  // "https://mainnet.infura.io/v3/13cbc4197182486485f1ebcb24068938"
  // const provider = new ethers.providers.JsonRpcProvider(
  //     "https://eth-mainnet.g.alchemy.com/v2/0VAqnL8By2MgfQ9IyZHwHaMGAhNwBtf2"
  // )

  const web3E = createAlchemyWeb3(
    "https://eth-mainnet.g.alchemy.com/v2/0VAqnL8By2MgfQ9IyZHwHaMGAhNwBtf2"
  );
  const web3P = createAlchemyWeb3(
    "https://polygon-mainnet.g.alchemy.com/v2/euZGVMQC1nnZiDkoqQAFRzC1f-zg8TV0"
  );
  const computeCirculation = async (tokenAddress, Network) => {
    console.log(tokenAddress);
    console.log(Network);
    await ERC20Check(tokenAddress, Network);
    console.log(totalSupply);
    await returnOwner(tokenAddress, Network);
    await returnOwner(tokenAddress, Network);
    console.log(contractDeployer);
    const ownerbalance = await returnBalanceOfTokens(
      contractDeployer,
      tokenAddress,
      Network
    );
    console.log(ownerBalance);
    const verify = await verifiedOrNot(tokenAddress, Network);
    console.log(isVerified);
    console.log(totalSupply, ownerBalance);
    console.log("total", parseInt(totalSupply));
    console.log("owber: ", parseInt(ownerbalance));

    const isEC2 = await ERC20BoolCheck(tokenAddress, Network);

    console.log(isEC2);

    const totalsupply = await ERC20Check(tokenAddress, Network);
    let circulation = 0.0;
    if (parseInt(totalsupply) !== 0) {
      circulation =
        ((parseInt(totalsupply) - parseInt(ownerbalance)) * 100) /
        parseInt(totalsupply);
    }

    let risk = 0.0;
    if (!verify) {
      setRiskFactor(100);
    } else if (verify && isEC2) {
      risk += 33.33;
      risk += (100 - circulation) / 3;
      setRiskFactor(risk);
    }

    console.log(circulation * 100);
    // const result = circulation * 100;
    return circulation.toString();
  };

  const verifiedOrNot = async (tokenAddress, Network) => {
    try {
      if (Network === "Ethereum") {
        const contract = await fetch(
          `https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`
        );
        const data = await contract.json();
        if (data.message === "OK") {
          setIsVerified(true);
          return true;
        } else {
          setIsVerified(false);
          return false;
        }
        // console.log(isVerified);
      }
      if (Network === "Polygon") {
        const contract = await fetch(
          `https://api.polygonscan.com/api?module=contract&action=getabi&address=${tokenAddress}&apikey=G7SH27QM1YUK3EG2IYSNV42DP7TG8V5FM6`
        );
        const data = await contract.json();
        if (data.message === "OK") {
          setIsVerified(true);
          return true;
        } else {
          setIsVerified(false);
          return false;
        }
      }
    } catch (error) {
      console.log("Error occured in the verified function - ", isVerified);
      return false;
    }
  };

  const getTokenSymbol = async (tokenAddress, Network) => {
    try {
      if (Network === "Ethereum") {
        const tokenContract = new web3E.eth.Contract(
          abi,
          web3E.utils.toChecksumAddress(tokenAddress)
        );
        const symbol = await tokenContract.methods.symbol().call();
        setSymbol(symbol);
        return symbol;
      }
      if (Network === "Polygon") {
        const tokenContract = new web3P.eth.Contract(
          abi,
          web3P.utils.toChecksumAddress(tokenAddress)
        );
        const symbol = await tokenContract.methods.symbol().call();
        setSymbol(symbol);
        return symbol;
      }
    } catch (error) {
      console.log("Error thrown by getTokenSymbol", error);
      return "";
    }
  };

  const getTokenDecimals = async (tokenAddress) => {
    try {
      if (network === "Ethereum") {
        const tokenContract = new web3E.eth.Contract(
          abi,
          web3E.utils.toChecksumAddress(tokenAddress)
        );
        const decimals = await tokenContract.methods.decimals().call();
        setDecimals(decimals);
      }
      if (network === "Polygon") {
        const tokenContract = new web3P.eth.Contract(
          abi,
          web3P.utils.toChecksumAddress(tokenAddress)
        );
        const decimals = await tokenContract.methods.decimals().call();
        setDecimals(decimals);
      }
      console.log(decimals);
    } catch (error) {
      console.log("Error thrown by getTokenSymbol", error);
    }
  };

  const ERC20Check = async (tokenAddress, Network) => {
    try {
      if (Network === "Polygon") {
        const token = await fetch(
          `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=G7SH27QM1YUK3EG2IYSNV42DP7TG8V5FM6`
        );
        const data = await token.json();
        console.log("data", typeof data.result);
        if (data.result !== "0") {
          setIsERC20(true);
          setTotalSupply(data.result);
          console.log(totalSupply);
          return data.result;
        }
        console.log(isERC20);
      }
      if (Network === "Ethereum") {
        const token = await fetch(
          `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`
        );
        const data = await token.json();
        console.log("data", data.result);
        if (data.result !== "0") {
          setIsERC20(true);
          setTotalSupply(data.result);
          console.log(data.result.substring(0, 4));
          return data.result;
        }
        console.log(isERC20);
      }
    } catch (error) {
      console.log("Error occured while ERC20Check function - ", error);
      //   return false;
    }
    // return false;
  };

  const ERC20BoolCheck = async (tokenAddress, Network) => {
    try {
      if (Network === "Polygon") {
        const token = await fetch(
          `https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=G7SH27QM1YUK3EG2IYSNV42DP7TG8V5FM6`
        );
        const data = await token.json();
        console.log("data", data.result);
        if (data.result) {
        //   setIsERC20(true);
          setTotalSupply(data.result);
          console.log(totalSupply);
          return true;
        }
        console.log(isERC20);
      }
      if (Network === "Ethereum") {
        const token = await fetch(
          `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`
        );
        const data = await token.json();
        console.log("data", data.result);
        if (data.result) {
        //   setIsERC20(true);
          setTotalSupply(data.result);
          console.log(data.result.substring(0, 4));
          return true;
        }
        console.log(isERC20);
      }
    } catch (error) {
      console.log("Error occured while ERC20Check function - ", error);
      //   return false;
    }
    // return false;
  };

  const returnOwner = async (tokenAddress) => {
    if (network === "Ethereum") {
      try {
        const owner = await fetch(
          `https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${tokenAddress}&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`
        );
        const data = await owner.json();
        console.log(data.result[0].contractCreator);
        const acc = data.result[0].contractCreator;
        setContractDeployer(acc);
        console.log(acc);
        return acc;
      } catch (e) {
        console.log("Error thrown by returnOwner function - ", e);
      }
    }
    if (network === "Polygon") {
      try {
        const owner = await fetch(
          `https://api.polygonscan.com/api?module=contract&action=getcontractcreation&contractaddresses=${tokenAddress}&apikey=G7SH27QM1YUK3EG2IYSNV42DP7TG8V5FM6`
        );
        const data = await owner.json();
        console.log(data.result[0].contractCreator);
        const acc = data.result[0].contractCreator;
        setContractDeployer(acc);
        console.log(acc);
        return acc;
      } catch (error) {
        console.log("Error thrown by returnOwner function - ");
      }
    }
  };

  const returnBalanceOfTokens = async (
    addressOfUser,
    tokenAddress,
    Network
  ) => {
    const acc = await returnOwner(tokenAddress, Network);
    if (Network === "Ethereum") {
      try {
        const bal = await fetch(
          `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${acc}&tag=latest&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`
        );
        const data = await bal.json();
        // console.log(data.result)
        console.log(data);
        setOwnerBalance(data.result);
        console.log(data.result.substring(0, 4));
        return data.result;
      } catch (error) {
        console.log("Error thrown by returnBalance function - ", ownerBalance);
      }
    }
    if (Network === "Polygon") {
      try {
        console.log(contractDeployer);
        const bal = await fetch(
          `https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${acc}&tag=latest&apikey=G7SH27QM1YUK3EG2IYSNV42DP7TG8V5FM6`
        );
        const data = await bal.json();
        console.log("first");
        // console.log(data.result)
        console.log(data);
        setOwnerBalance(data.result);
        console.log(data.result.substring(0, 4));
        return data.result;
      } catch (error) {
        console.log("Error thrown by returnBalance function - ");
      }
    }
  };

  // const returnABI = async (tokenAddress) => {
  //     try {
  //         const abi = await fetch(`https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`)
  //         const data = await abi.json()
  //         setContractABI(data.result)
  //         console.log(contractABI)

  //     } catch (error) {
  //         console.log("Error generated by returnABI function", error)
  //     }
  // }
  return (
    <AppConfig.Provider
      value={{
        ERC20Check,
        isERC20,
        isVerified,
        totalSupply,
        returnOwner,
        returnBalanceOfTokens,
        ownerBalance,
        contractDeployer,
        computeCirculation,
        getTokenSymbol,
        verifiedOrNot,
        setNetwork,
        network,
        getTokenDecimals,
        riskFactor,
      }}
    >
      {children}
    </AppConfig.Provider>
  );
};
