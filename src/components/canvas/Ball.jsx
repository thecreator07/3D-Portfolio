import {
  Decal,
  Float,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  useTexture,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import { technologies } from "../../constants";
import { randomInt } from "mathjs";
import * as THREE from "three";
// import { Physics, usePlane, useSphere } from "@react-three/cannon";

const Balls = React.memo(({ position, icon, name }) => {
  const [decal] = useTexture([icon]);
  const [randomColor, setRandomColor] = useState("#FFFFFF");

  const [ISmobile, setIsmobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:500px)");
    setIsmobile(mediaQuery.matches);
    const handleMediaquery = (e) => {
      setIsmobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaquery);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaquery);
    };
  });

  useEffect(() => {
    const generateRandomColor = () => {
      // Implement your color generation logic here
      // Example:
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      setRandomColor(`rgb(${red}, ${green}, ${blue})`);
    };

    // Generate a random color on initialization
    generateRandomColor();
    // return randomColor;
  }, []);

  return (
    <Float
      speed={1}
      scale={ISmobile ? 0.6 : 1}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh
        // ref={ref}
        castShadow
        receiveShadow
        scale={1}
        name={name}
        position={position}
      >
        <icosahedronGeometry args={[0.4, 2]} />
        <meshStandardMaterial
          color={randomColor}
          polygonOffset
          polygonOffsetFactor={-1}
          // metalness={0}
          // roughness={0}
          // flatShading
          emissive={randomColor}
          emissiveIntensity={1}
        />
        <Decal
          position={[0, 0, 0.4]}
          rotation={[2 * Math.PI, 0, Math.PI/8]}
          scale={0.4}
          map={decal}
          // flatShading
        />
      </mesh>
    </Float>
  );
});

const Ballgroup = React.memo(() => {
  return (
    <>
      {technologies.map((tech, i) => {
        return (
          <Balls
            key={`ball${i}`}
            icon={tech.icon}
            {...name}
            // position={[i < 6 ? -(i - 1) * 2 : i * 2, -2, 0]}
            position={[randomInt(-5, 5), randomInt(-2.5, 3), 0]}
          />
        );
      })}
    </>
  );
});

const OrbitControler = React.memo(() => {
  const { camera, gl, invalidate } = useThree();

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
      invalidate(); // Forces a re-render
    };
    gl.shadowMap.enabled = true;
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, gl, invalidate]);

  return (
    <OrbitControls
    enableZoom={false}
    // maxPolarAngle={Math.PI / 2}
    // minPolarAngle={Math.PI / 2}
    // maxAzimuthAngle={Math.PI / 4}
    // minAzimuthAngle={Math.PI / 4}
    />
  );
});

const Ball = React.memo(() => {
  return (
    <Canvas>
      {/* <color attach="background" args={["#94ebd8"]} /> 
      <fog attach={"fog"} args={["#94ebd8", 0, 40]} />  */}
      <Suspense fallback="loading">
        <PerspectiveCamera
          fov={45}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={200}
          // position={[0, -20, 0]} //only for game
        >
          <directionalLight position={[0, 0, 4]}  intensity={0.25}/>
          <ambientLight color="#ffffff" intensity={0.25}/>
          {/* <directionalLight intensity={0.1} castShadow/>
          <pointLight  intensity={1000}
            args={[0xff0000]}
            position={[-1, 3, 1]} castShadow />
          <ambientLight/> */}
          {/* <spotLight
            castShadow
            intensity={1}
            args={["blue", 1, 100]}
            position={[-1, 4, -1]}
            penumbra={1}
          /> */}
          <OrbitControler />
          <Ballgroup />
          {/* <Game /> */}
          {/* <Stars/> */}
        </PerspectiveCamera>
      </Suspense>
    </Canvas>
  );
});

export default Ball;
