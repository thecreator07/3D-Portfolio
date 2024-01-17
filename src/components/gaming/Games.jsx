import React, { useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls, Stats, useHelper } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PlaneGeometry } from "three";
import * as THREE from "three";
import { useControls } from "leva";
import {Perf} from "r3f-perf"
import {
  Physics,
  useBox,
  // useContactMaterial,
  usePlane,
  useSphere,
} from "@react-three/cannon";
import { randomInt } from "mathjs";
import { DirectionalLightHelper } from "three";
const position = [
  [0, 3, 2],
  [-2, 3, 2],
  [10, 3, 2],
  [6, 4, 2],
  [5, 6, 2],
  [7, 3, 4],
  [2, 5, 2],
];

const Box = React.memo(({ position }) => {
  const [ref] = useBox(() => ({
    mass: 1,
    linearDamping: 0.5,
    // angularDamping: 0.5,
    // angularVelocity: 0.1,
    position: position,
  }));
  // const geom = useMemo(() => new THREE.SphereGeometry(1, 20, 20), []);
  // const mat = useMemo(
  //   () =>
  //     new THREE.MeshStandardMaterial({
  //       color: Math.random() * 0xffffff,
  //       metalness: 0,
  //     }),
  //   []
  // );
  return (
    <>
      <mesh ref={ref} position={position} receiveShadow castShadow>
        <boxGeometry args={[1, 1]} />
        <meshStandardMaterial color={Math.random() * 0xffffff} />
      </mesh>
    </>
  );
});

const Boxes = React.memo(() => {
  return (
    <>
      {position.map((data, id) => {
        return (
          <Box
            key={id}
            position={[randomInt(5, 10), randomInt(10, 15), randomInt(2, 4)]}
          />
        );
      })}
    </>
  );
});

const Sphere = React.memo(({ position }) => {
  // const [randomColor, setRandomColor] = useState("#FFFFFF");
  const [ref] = useSphere(() => ({
    mass: 1,
    position: position,
    linearDamping: 0.5,
    material: { friction: 1, restitution: 0.9 },
  }));
  const geom = useMemo(() => new THREE.SphereGeometry(1, 20, 20), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        metalness: 0,
      }),
    []
  );

  return (
    <mesh ref={ref} geometry={geom} material={mat} receiveShadow castShadow />
  );
});

const Spheres = React.memo(() => {
  return (
    <>
      {position.map((data, id) => {
        return <Sphere key={id} position={data} />;
      })}
    </>
  );
});
const Plane = React.memo(() => {
  const [ref, api] = usePlane(() => ({
    mass: 1,
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    type: "Static",
    material: { restitution: 0.9, friction: 1 },
  }));

  useFrame(({ mouse }) => {
    api.rotation.set(-Math.PI / 2 - mouse.x * 0.2, mouse.y * 0.2, 0);
  });
  // api.quaternion.set(-Math.PI / 2, 0, 0);

  return (
    <mesh scale={200} rotation={[-Math.PI / 2, 0, 0]} receiveShadow ref={ref}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        emissive={"#94ebd8"}
        emissiveIntensity={0.1}
        color={"#94ebd8"}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
});
const Lamp = React.memo(() => {
  const { position } = useControls({ position: { value: 0, min: 0, max: 10 } });
  const [ref] = useSphere(() => ({
    mass: 5,
    position: [position, 0.5, 1],
    type: "Static",
  }));

  // const lamref = useRef(null);
  // useFrame((mouse) => {
  //   lamref.current.position.set(mouse.x, mouse.y, 0);
  // });
  return (
    <>
      <mesh position={[0, 0.5, 1]} ref={ref} castShadow>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial
          color={"white"}
          emissive={"white"}
          emissiveIntensity={2}
          // emissiveMap={1}
        />
      </mesh>
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
    // gl.shadowMap.enabled = true;
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [camera, gl, invalidate]);

  return (
    <OrbitControls
      enableZoom={true}
      // maxPolarAngle={Math.PI / 2}
      // minPolarAngle={Math.PI / 2}
      // maxAzimuthAngle={Math.PI / 4}
      // minAzimuthAngle={Math.PI / 4}
    />
  );
});

const Lights = React.memo(() => {
  const lightref = useRef(null);
  // useHelper(lightref, DirectionalLightHelper, 2, "blue");
  const { Dintensity, Pintensity, Pposition } = useControls({
    Dintensity: { value: 0, min: 0, max: 10 },
    Pintensity: { value: 0, min: 10, max: 1000 },
    Pposition: { value: 0, min: 0, max: 10 },
  });
  return (
    <>
      <directionalLight
        castShadow
        intensity={Dintensity}
        ref={lightref}
        position={[10, 10, 10]}
      />
      <pointLight
        position={[Pposition, 0.5, 1]}
        castShadow
        intensity={Pintensity}
        args={[0xff0000, 1, 1000]}
      />
      <spotLight
        castShadow
        intensity={1}
        args={["blue", 1, 100]}
        position={[-1, 4, -1]}
      />
    </>
  );
});

const Game = React.memo(() => {
  return (
    <>
      <color attach="background" args={["#94ebd8"]} />
      <fog attach={"fog"} args={["#94ebd8", 0, 100]} />
      <ambientLight intensity={0.2} />

      <Lights />
      <Physics gravity={[0, -9.81, 0]}>
        <Boxes />
        <Lamp />
        <Plane />
        <Spheres />
      </Physics>
      <OrbitControler />
    </>
  );
});

function Games() {
  return (
    <section className="h-screen w-screen m-0 p-0">
      <Canvas performance={"regress"} shadows camera={{ position: [0, 20, 0] }}>
        <Game />
        <Stats />
        <Perf/>
      </Canvas>
    </section>
  );
}

export default Games;
