import React, { Suspense } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../h_OComponent";
import { Link } from "react-router-dom";

const Tech = () => {
  return (
    <div className="flex items-center h-[400px] justify-center">
      <Suspense fallback="loading">
        <BallCanvas />
      </Suspense>
      <Link to={"/game"} className="absolute top-0 bg">
        <button>play</button>
      </Link>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
