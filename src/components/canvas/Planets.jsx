import {
  OrbitControls,
  PerspectiveCamera,
  // Stars,
  // useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
// import { PointLightHelper} from '@react-three/drei'
import * as THREE from "three";
import Loader from "../Loader";
const sunRadius = 0.7;
const planetData = [
  {
    name: "Mercury",
    radius: 0.07,
    distance: 1,
    orbitSpeed: 1.3,
    color: "grey",
  },
  {
    name: "Venus",
    radius: 0.14,
    distance: 2,
    orbitSpeed: 1.5,
    color: "orange",
  },
  {
    name: "Earth",
    radius: 0.28,
    distance: 3,
    orbitSpeed: 1.8,
    color: "blue",
  },
  // ... other planets
];

function SolarSystem() {
  const sunref = useRef(null);
  const [ISmobile, setIsmobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width:500px)');
    setIsmobile(mediaQuery.matches);
    const handleMediaquery = (e) => {
      setIsmobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaquery);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaquery);
    };
  });

   return (
    <>
      <group scale={ISmobile?0.8:1} ref={sunref} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <mesh name="sun">
          <sphereGeometry args={[sunRadius]} />
          <meshStandardMaterial  color={'#FFFFFF'}/>
        </mesh>

        {planetData.map((planet) => (
          <Planet
            key={planet.name}
            name={planet.name}
            radius={planet.radius}
            distance={planet.distance}
            Speed={planet.orbitSpeed}
            
            color={planet.color}
          />
        ))}
      </group>
    </>
  );
}

const Planet = React.memo(({ distance, radius, color, name, Speed }) => {
  const [animationState, setAnimationState] = useState(0);
  const planetref = useRef();
  const clockRef=useRef(new THREE.Clock())

  
  useFrame(() => {
    const elapsedTime = clockRef.current.getElapsedTime();
    // planetref.current.rotateY(elapsedTime);
    setAnimationState(elapsedTime);
    // Rotate sphere1 around the center sphere
    const radius = distance; // Adjust the radius of the orbit
    const speed = Speed; // Adjust the rotation speed
    const angle = animationState * speed; // Use getElapsedTime() instead
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    planetref.current.position.set(x, 0, z);
    // console.log(elapsedTime, planetref.current);
  });

  return (
    <mesh ref={planetref} name={name} castShadow={true} receiveShadow={true}>
      <sphereGeometry args={[radius, 32, 16, 0]} />
      <meshStandardMaterial color={color}/>
    </mesh>
  );
});

const PointLights = React.memo(() => {
  // const { scene } = useThree();
  const lightPosition = [0, 0, 0];
  const lightIntensity = 10;
  const lightDistance = 30000;

  return (
    <>
      <pointLight
        castShadow={true}
        intensity={lightIntensity}
        position={lightPosition}
        distance={lightDistance}
      />
      {/* <PointLightHelper args={[lightPosition, lightDistance]}/> */}
    </>
  );
});

const AmbientLights = React.memo(() => {
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

  return <ambientLight intensity={3} />;
});
const SpotLights = () => {
  return (
    <spotLight
      position={[-20, 50, 10]}
      angle={Math.PI / 6}
      penumbra={1}
      intensity={10}
      castShadow
    />
  );
};
const Planets = React.memo(() => {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <PerspectiveCamera
          fov={25}
          aspect={window.innerWidth / window.innerHeight}
          near={1}
          far={10}
          position={[0, 0, 0]}
        >
          <PointLights />
          {/* <SpotLights /> */}
          <AmbientLights />
          {/* <axesHelper /> */}
          {/* <directionalLight intensity={5} position={[3, 3, 5]} /> */}
          <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          />
          <SolarSystem />
        </PerspectiveCamera>
      </Suspense>
    </Canvas>
  );
});

export default Planets;
