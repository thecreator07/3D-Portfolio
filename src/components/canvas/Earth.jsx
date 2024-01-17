import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../Loader";
import CloudsMap from "../../assets/earth/2k_earth_clouds.jpg";
import Earthmap from "../../assets/earth/2k_earth_daymap.jpg";
// import specularMap from "../../assets/earth/8k_earth_specular_map.tif";
// import normalMap from "../../assets/earth/8k_earth_normal_map.tif";
const Earth = React.memo(() => {
  // const [earthmap, normalMap, specularMap, cloudsMap] = useLoader(
  //   TextureLoader,
  //   [Earthmap, normalMap, specularMap, CloudsMap]
  // );
  // const clocks=Clock().getElapsedTime()
  const [animationState, setAnimationState] = useState(0);
  const { camera, gl, invalidate } = useThree();
  const clockRef = useRef(new THREE.Clock());
  const emap = useTexture(Earthmap);
  const cmap = useTexture(CloudsMap);
  // const earth = useGLTF("./planet/scene.gltf");
  const cloudsRef = useRef();
  const earthRef = useRef();
  const framefunc = useCallback(() => {
    const elapsedTime = clockRef.current.getElapsedTime();
    setAnimationState(elapsedTime);
    earthRef.current.rotation.y = animationState / 120;
    cloudsRef.current.rotation.y = animationState / 150;
  }, [earthRef.current]);

  useFrame(() => {
    framefunc();
  });

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
    // <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
    <>
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshPhongMaterial
          map={cmap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        {/* <meshPhongMaterial specularMap={specularMap} /> */}
        <meshStandardMaterial
          map={emap}
          // normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </>
  );
});

const EarthCanvas = React.memo(() => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        // position: [-4, 3, 6],
      }}
    >
      <fog attach={"fog"} args={["#94ebd8", 0, 30]} />
      <Suspense fallback={"loading"}>
        <ambientLight />
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
});

export default EarthCanvas;
