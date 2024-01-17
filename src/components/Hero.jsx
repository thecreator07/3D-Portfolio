import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { RotatingCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className="w-full h-screen relative">
      <div
        className={`${styles.canvaspad} z-0 absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]"></div>
          <div className="w-1 sm:h-80 h-40 violet-gradient"></div>
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi,I'm <span className="text-[#915eff]">Aman</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I am MERN Stack Developer with 3D visuals and
            <br className="sm:block hidden" /> Learning the Data-Science.{" "}
          </p>
        </div>
      </div>
      <div
        className={`${styles.canvaspad} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <RotatingCanvas />
      </div>
        <div className="absolute xs:bottom-10 bottom-2 w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
    </section>
  );
};

export default Hero;
