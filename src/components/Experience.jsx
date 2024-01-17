import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { experiences } from "../constants";
import { SectionWrapper } from "../h_OComponent";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import "react-vertical-timeline-component/style.min.css";
const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>what i have done so far</p>
        <h2 className={styles.sectionHeadText}>work experience</h2>
      </motion.div>
      <div className="mt-20">
        <VerticalTimeline>
          {experiences.map((work, index) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              key={index}
              contentStyle={{
                background: "rgb(33, 150, 243)",
                color: "#fff",
              }}
              contentArrowStyle={{
                borderRight: "7px solid  rgb(33, 150, 243)",
              }}
              date={work.date}
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
              icon={
                <div className="flex justify-center items-center h-full w-full">
                  <img
                    src={work.icon}
                    alt={work.company_name}
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
              }
            >
              <div>
                <h3 className="text-white text-2xl font-bold vertical-timeline-element-title">
                  {work.title}
                </h3>
                <p className="text-secondary text-base font-semibold m-0">
                  {work.company_name}
                </p>
              </div>
              <ul className="mt-5 list-disc ml-5 space-y-2">
                {work.points.map((point, index) => (
                  <li
                    key={index}
                    className="text-white-100 text-sm pl-1 tracking-wider"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "works");
