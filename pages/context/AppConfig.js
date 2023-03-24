import React, { useState, createContext, useEffect } from "react";
export const AppConfig = createContext();
import { ethers } from "ethers"
import contrAbi from "../context/abi.json"
import { createAlchemyWeb3 } from "@alch/alchemy-web3"
export const AppProvider = ({ children }) => {
    const [isERC20, setIsERC20] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [totalSupply, setTotalSupply] = useState("")
    const [contractDeployer, setContractDeployer] = useState("")
    const [ownerBalance, setOwnerBalance] = useState("")
    const [symbol, setSymbol] = useState("")
    const [decimals, setDecimals] = useState("")
    const [network, setNetwork] = useState("Network")
    // web3 provider
    const abi = contrAbi.abi
    // "https://mainnet.infura.io/v3/13cbc4197182486485f1ebcb24068938"
    // const provider = new ethers.providers.JsonRpcProvider(
    //     "https://eth-mainnet.g.alchemy.com/v2/0VAqnL8By2MgfQ9IyZHwHaMGAhNwBtf2"
    // )

    const web3E = createAlchemyWeb3("https://eth-mainnet.g.alchemy.com/v2/0VAqnL8By2MgfQ9IyZHwHaMGAhNwBtf2");
    const web3P = createAlchemyWeb3("https://polygon-mainnet.g.alchemy.com/v2/euZGVMQC1nnZiDkoqQAFRzC1f-zg8TV0");
    const computeCirculation = async (tokenAddress) => {
        await ERC20Check(tokenAddress)
        await returnOwner(tokenAddress)
        await returnBalanceOfTokens(contractDeployer, tokenAddress)
        const circulation = (totalSupply - ownerBalance) / totalSupply
        console.log(circulation * 100)
    }

    const verifiedOrNot = async (tokenAddress) => {
        try {
            if (network === "Ethereum") {
                const contract = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`)
                const data = await contract.json()
                if (data.message === "OK") {
                    setIsVerified(true)
                } else {
                    setIsVerified(false)
                }
                console.log(isVerified)
            }
            if (network === "Polygon") {
                const contract = await fetch(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${tokenAddress}&apikey=T3BXW7U1MKA5Q5CG8E8T4MKXKME1YSWWB6`)
                const data = await contract.json()
                if (data.message === "OK") {
                    setIsVerified(true)
                } else {
                    setIsVerified(false)
                }
                console.log(isVerified)
            }
        } catch (error) {
            console.log("Error occured in the verified function - ", isVerified)
        }
    }

    const getTokenSymbol = async (tokenAddress) => {
        try {
            if (network === "Ethereum") {
                const tokenContract = new web3E.eth.Contract(abi, web3E.utils.toChecksumAddress(tokenAddress))
                const symbol = await tokenContract.methods.symbol().call()
                setSymbol(symbol)
            }
            if (network === "Polygon") {
                const tokenContract = new web3P.eth.Contract(abi, web3P.utils.toChecksumAddress(tokenAddress))
                const symbol = await tokenContract.methods.symbol().call()
                setSymbol(symbol)
            }
        } catch (error) {
            console.log("Error thrown by getTokenSymbol", error)
        }

    }

    const getTokenDecimals = async (tokenAddress) => {
        try {
            if (network === "Ethereum") {
                const tokenContract = new web3E.eth.Contract(abi, web3E.utils.toChecksumAddress(tokenAddress))
                const decimals = await tokenContract.methods.decimals().call()
                setDecimals(decimals)
            }
            if (network === "Polygon") {
                const tokenContract = new web3P.eth.Contract(abi, web3P.utils.toChecksumAddress(tokenAddress))
                const decimals = await tokenContract.methods.decimals().call()
                setDecimals(decimals)
            }
            console.log(decimals)
        } catch (error) {
            console.log("Error thrown by getTokenSymbol", error)
        }
    }

    const ERC20Check = async (tokenAddress) => {
        try {
            if (network === "Polygon") {
                const token = await fetch(`https://api.polygonscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=T3BXW7U1MKA5Q5CG8E8T4MKXKME1YSWWB6`);
                const data = await token.json()
                if (data.result != 0) {
                    setIsERC20(true)
                    setTotalSupply(data.result)
                }
                console.log(isERC20)
            }
            if (network === "Ethereum") {
                const token = await fetch(`https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${tokenAddress}&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`);
                const data = await token.json()
                if (data.result != 0) {
                    setIsERC20(true)
                    setTotalSupply(data.result)
                }
                console.log(isERC20)
            }
        } catch (error) {
            console.log("Error occured while ERC20Check function - ", error)
        }
    }

    const returnOwner = async (tokenAddress) => {
        if (network === "Ethereum") {
            try {
                const owner = await fetch(`https://api.etherscan.io/api?module=contract&action=getcontractcreation&contractaddresses=${tokenAddress}&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`)
                const data = await owner.json()
                console.log(data)
                setContractDeployer(data.result[0].contractCreator)
                console.log(data.result[0].contractCreator)
            } catch (e) {
                console.log("Error thrown by returnOwner function - ", e)
            }
        }
        if (network === "Polygon") {
            try {
                const owner = await fetch(`https://api.polygonscan.com/api?module=contract&action=getcontractcreation&contractaddresses=${tokenAddress}&apikey=T3BXW7U1MKA5Q5CG8E8T4MKXKME1YSWWB6`)
                const data = await owner.json()
                setContractDeployer(data.result[0].contractCreator)
                console.log(data.result[0].contractCreator)
            } catch (error) {
                console.log("Error thrown by returnOwner function - ", e)
            }
        }

    }

    const returnBalanceOfTokens = async (addressOfUser, tokenAddress) => {
        if (network === "Ethereum") {
            try {
                const bal = await fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${addressOfUser}&tag=latest&apikey=VH1C8WZCNYE12YZB3M5YETM82KGPNHI6SI`)
                const data = await bal.json()
                // console.log(data.result)
                setOwnerBalance(data.result)
            } catch (error) {
                console.log("Error thrown by returnBalance function - ", ownerBalance)
            }
        }
        if (network === "Polygon") {
            try {
                const bal = await fetch(`https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${addressOfUser}&tag=latest&apikey=T3BXW7U1MKA5Q5CG8E8T4MKXKME1YSWWB6`)
                const data = await bal.json()
                // console.log(data.result)
                setOwnerBalance(data.result)
            } catch (error) {
                console.log("Error thrown by returnBalance function - ", ownerBalance)
            }
        }
    }

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
        <AppConfig.Provider value={{ ERC20Check, isERC20, totalSupply, returnOwner, returnBalanceOfTokens, ownerBalance, contractDeployer, computeCirculation, getTokenSymbol, verifiedOrNot, setNetwork, network, getTokenDecimals }}>
            {children}
        </AppConfig.Provider >
    )
}