"use client";

import { motion } from "framer-motion";
import { TypingText } from "../components";
import { title } from "../constants";

import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title=" About our Platform " textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        <span className="font-extrabold text-white"></span> {title} is a tool which can
        detect Vulnerable Crypto currencies and generate a risk factor of the
        given address.{" "}
        <span className="font-extrabold text-white">
          The Crypto Detection uses
        </span>{" "}
        Blockchain APIs to give the required Data{" "}
        <span className="font-extrabold text-white">
          {" "}
          Cryptos such as Ether,Tether,Dogecoin,Monero etc.{" "}
        </span>{" "}
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
