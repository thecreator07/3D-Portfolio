import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";
import { styles } from "../styles";

const SectionWrapper = (Component, idname) => () => {
  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <span className="hash-span" id={idname}></span>
      <Component />
    </motion.section>
  );
};

export default SectionWrapper;
