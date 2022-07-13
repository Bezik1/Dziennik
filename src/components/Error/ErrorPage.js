import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { isError } from "../../helpers/isError";

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => {
    controls.current.update();
  });
  return (
    <orbitControls
      target={[0, 4, 0]}
      /*autoRotate={true}
      autoRotateSpeed={10}*/
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      /*maxAzimuthAngle={Math.PI / 4}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Math.PI / 4}
        minPolarAngle={0}*/
    />
  );
};

const Texts = () => {
  const ref = useRef();
  const group = useRef();
  const [hovered, hover] = useState(false);
  const params = useParams();

  useFrame((state, delta) =>
    hovered
      ? (group.current.rotation.y -= 0.02)
      : (group.current.rotation.y += 0.02)
  );

  let { type } = params;
  if (isError()) {
    type = type;
  } else {
    type = 404;
  }

  return (
    <group
      ref={group}
      onPointerOver={() => {
        hover(!hovered);
      }}
      onPointerOut={() => {
        hover(!hovered);
      }}
    >
      <Text
        ref={ref}
        position={[0, 0, -25]}
        lineHeight={0.02}
        fontSize={10}
        material-toneMapped={false}
        anchorX="center"
        color={hovered ? "hotpink" : "white"}
        onPointerOver={() => {
          hover(!hovered);
        }}
        onPointerOut={() => {
          hover(!hovered);
        }}
        anchorY="middle"
      >
        Error {type}
      </Text>
      <Text
        ref={ref}
        rotation={[0, Math.PI, 0]}
        position={[0, 0, 25]}
        lineHeight={0.02}
        fontSize={10}
        material-toneMapped={false}
        anchorX="center"
        color={hovered ? "hotpink" : "white"}
        onPointerOver={() => {
          hover(!hovered);
        }}
        onPointerOut={() => {
          hover(!hovered);
        }}
        anchorY="middle"
      >
        Error {type}
      </Text>
      <Text
        ref={ref}
        position={[25, 0, 0]}
        rotation={[0, Math.PI / -2, 0]}
        lineHeight={0.02}
        fontSize={10}
        material-toneMapped={false}
        anchorX="center"
        color={hovered ? "hotpink" : "white"}
        onPointerOver={() => {
          hover(!hovered);
        }}
        onPointerOut={() => {
          hover(!hovered);
        }}
        anchorY="middle"
      >
        Error {type}
      </Text>
      <Text
        ref={ref}
        position={[-25, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        lineHeight={0.02}
        fontSize={10}
        material-toneMapped={false}
        anchorX="center"
        color={hovered ? "hotpink" : "white"}
        onPointerOver={() => {
          hover(!hovered);
        }}
        onPointerOut={() => {
          hover(!hovered);
        }}
        anchorY="middle"
      >
        Error {type}
      </Text>
    </group>
  );
};

const Error = () => {
  window.localStorage.clear();

  const width = window.innerWidth * 0.9;
  const height = window.innerHeight * 0.71;

  return (
    <Canvas
      style={{ position: "relative", width: width, height: height }}
      camera={{ position: [20, 4, 0] }}
    >
      <Texts />

      <CameraControls />
    </Canvas>
  );
};

export default Error;
