import { AnkrProvider } from "@ankr.com/ankr.js";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import Web3 from "web3";
import contrAbi from "./abi.json" assert { type: "json" };

const web3B = new AnkrProvider();
const web3Ba = new createAlchemyWeb3("https://bsc-dataseed2.binance.org/");
const price = await web3B.getTokenPrice({
  blockchain: "bsc",
  contractAddress: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
});

const erc = await web3B.getTokenHoldersCount({
  blockchain: "eth",
  contractAddress: "0x4D2CEb9b3775515bFeAE34A7B6D8f0820C236eaF",
});

await web3B.getTokenTransfers({
  blockchain: "bsc",
  contractAddress: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
});

console.log(price);
console.log(erc.latestHoldersCount);

const url = "https://bsc-dataseed1.binance.org/";
const web3 = new Web3(url);
//console.log(web3);

const abi = await fetch(
  "https://api.bscscan.com/api?module=contract&action=getabi&address=0x55d398326f99059fF775485246999027B3197955&apikey=67UMGA5UTJ8WRJXPHXC79VWBB2CHMPHXHK"
);
const response = await abi.json();
//const ABI = response.result;
//console.log(ABI);
const aBI = contrAbi.abi;
const tokenContract = await new web3Ba.eth.Contract(
  aBI,
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
);
console.log(await tokenContract.methods.symbol().call());
