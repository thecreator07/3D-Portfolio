import { Suspense, useState } from "react";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Games from "./components/gaming/Games";
import Game1 from "./components/gaming/Game1";
const LandingPage = () => {
  return (
    <>
      <div className="relative z-0 bg-primary">
        <div className=" gradientcolor bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        {/* <Works /> */}
        {/* <Feedbacks /> */}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={"loading"}>
              <LandingPage />
            </Suspense>
          }
        />
         <Route
          exact
          path="/game"
          element={
            <Suspense fallback={"loading"}>
              <Games />
            </Suspense>
          }
        />
         <Route
          exact
          path="/game/Game1"
          element={
            <Suspense fallback={"loading"}>
              <Game1 />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
