/* eslint-disable quotes */
// "use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { title } from "../constants";
import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";

export default function Hero() {
  const [network, setNetwork] = useState("Network");
  const [showDropDown, setShowDropDown] = useState(false);
  const networks = ["Polygon", "Ethereum", "BSC"];

  return (
    <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="flex justify-center items-center flex-col relative z-10">
          <motion.h1
            variants={textVariant(1.1)}
            className={styles.heroHeading}
          ></motion.h1>
          <motion.div
            variants={textVariant(1.2)}
            className="flex flex-row justify-center items-center"
          >
            <h1 className={styles.heroHeading}></h1>
            <div className="flex flex-col justify-center text-white font-bold text-3xl">
              <p className="text-7xl text-white font-extrabold flex justify-center">
                {title}
              </p>
              <p>Scan and verify your token before deploying it on the chain</p>
            </div>
            <h1 className={styles.heroHeading}></h1>
          </motion.div>
        </div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="relative w-full md:-mt-[20px] -mt-[12px]"
        >
          <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />
          <div className="absolute z-20 flex justify-center w-full mt-20">
            <form className="md:w-1/2">
              <div className="flex">
                <button
                  id="dropdown-button"
                  onClick={() => setShowDropDown(!showDropDown)}
                  data-dropdown-toggle="dropdown"
                  className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-200"
                  type="button"
                >
                  {network}{" "}
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className={`${
                    showDropDown ? "block" : "hidden"
                  } z-50 bg-white divide-y divide-gray-100 absolute top-10 rounded-lg shadow w-44`}
                >
                  <ul
                    className="z-50 py-2 text-sm text-gray-700"
                    aria-labelledby="dropdown-button"
                  >
                    {networks.map((Network) => (
                      <li
                        onClick={() => {
                          setNetwork(Network);
                          setShowDropDown(false);
                        }}
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {Network}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative w-full z-50">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-30 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300"
                    placeholder="Search"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <img
            src="/cover.png"
            alt="hero_cover"
            className="w-full sm:h-[500px] h-[350px] object-cover rounded-tl-[140px] z-10 relative"
          />

          <a href="#explore">
            <div className="w-full flex justify-end sm:-mt-[70px] -mt-[50px] pr-[40px] relative z-10"></div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
