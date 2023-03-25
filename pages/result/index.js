/* eslint-disable react/function-component-definition */
/* eslint-disable quotes */
import { useContext, useEffect, useState } from "react";
import { Footer, Navbar } from "../../components";
import { AppConfig } from "../../context/AppConfig";
// import { tick } from "../../public/tick.png";
// import scrapper from "../scrapper/scrapper";
// import { Checkmark } from "react-checkmark";
import { useRouter } from "next/router";

function Result(props) {
  const router = useRouter();
  const {
    isERC20,
    isVerified,
    ERC20Check,
    computeCirculation,
    verifiedOrNot,
    getTokenSymbol,
    totalSupply,
    riskFactor,
  } = useContext(AppConfig);

  const [ERC20Verified, setERC20Verified] = useState(false);
  const [verified, setverified] = useState(false);
  const [circulation, setCirculation] = useState("98");
  const [symbol, setSymbol] = useState("");
  //   const [riskfactor, setRiskFactor] = useState(0);

  //   console.log(props.tokenAddress);
  //   console.log(props.network);

  // ERC20 check
  async function callERC20() {
    const response = await ERC20Check(props.tokenAddress, props.network);
    setERC20Verified(response);
    console.log("ERC20: ", response);
    return response;
  }

  // contract verification check
  async function callVerification() {
    const response = await verifiedOrNot(props.tokenAddress, props.network);
    setverified(response);
    console.log("Verified: ", response);
    return response;
  }

  // circulation supply check
  async function callCirculationSupply() {
    console.log("called");
    const response = await computeCirculation(
      props.tokenAddress,
      props.network
    );
    setCirculation(response);
    // setCirculation(99);
    console.log("Circulation: ", response);
    return response;
  }

  //   async function callScrapper() {
  //     const holdings = await scrapper(props.tokenAddress);
  //     console.log(holdings);
  //   }

  async function getSymbol() {
    const Symbol = await getTokenSymbol(props.tokenAddress, props.network);
    console.log(Symbol);
    setSymbol(Symbol);
  }

  //   const methods = [callERC20, callVerification, callCirculationSupply];

  useEffect(() => {
    getSymbol();

    async function callMethods() {
      await callCirculationSupply();
    }

    callMethods();

    // let riskFactor = 0.0;
    // if (!isVerified) {
    //   setRiskFactor(100);
    // } else if (isVerified && isERC20) {
    //   riskFactor += 33.33;
    //   riskFactor += (100 - circulation) / 3;
    //   setRiskFactor(riskFactor);
    // }

    console.log(totalSupply);

    // verifiedOrNot("0x69E7294e94d33aA6109486BA10Bfaf25F823D05d");
  }, []);

  return (
    <div className="bg-primary-black overflow-hidden min-h-screen">
      <i
        className="fa fa-arrow-left text-white text-3xl font-bold p-4"
        onClick={() => {
          router.push("/");
          router.reload(window.location.pathname);
        }}
      ></i>
      <Navbar />
      {/* Result */}
      <div className="m-12 text-white">
        <div className="flex gap-6 justify-between flex-col md:flex-row text-3xl">
          <div>
            <p className="font-bold text-5xl">Token Details</p>
            <p>Token Address: {props.tokenAddress}</p>
            <p>Network: {props.network}</p>
            <p>Token Name: {symbol}</p>
          </div>
          <div>
            <b className="text-5xl">Tests</b>
            <div className="flex gap-2 items-center align-left">
              {/* <Checkmark /> */}
              {isERC20 && (
                <div className="text-green-700 bg-green-400 rounded-full">
                  <i className="fa fa-check text-green-700" />
                </div>
              )}
              <p>ERC20</p>
            </div>
            <div className="flex gap-2 items-center">
              {/* <Checkmark /> */}
              {isVerified && (
                <div className="text-green-700 bg-gray-400 pr-12 rounded-full">
                  <i className="fa fa-check text-green-700" />
                </div>
              )}
              <p>Verified Contract</p>
            </div>
            <div className="flex gap-2 items-center">
              {/* <Checkmark /> */}
              <p>Token Circulation: {circulation}</p>
            </div>
            <div className="flex gap-2 items-center">
              {/* <Checkmark /> */}
              <p>Total Supply: {totalSupply}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-6 pt-48 text-3xl">
          <p>Risk Factor:</p>
          <p>{riskFactor}</p>
        </div>
      </div>
      <bar />
      <Footer className="min-h-screen" />
    </div>
  );
}

export default Result;
