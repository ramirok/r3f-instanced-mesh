import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useStore } from "./store";

const colorPink = new THREE.Color(0xdb2777);
const colorBlack = new THREE.Color(0x0a0a0a);
const placeholderObject = new THREE.Object3D();

const axis = ["x", "y", "z"] as const;
type CubeUserData = {
  dir: (typeof axis)[number];
  sign: number;
  remainingDistance: number;
  speed: number;
  isWaiting: boolean;
  currentWaitTime: number;
  waitTime: number;
  totalDistance: number;
};

export default function Cubes() {
  const boundary = useStore((state) => state.boundary);
  const cubesAmount = useStore((state) => state.cubesAmount);
  const refCubeStates = useRef<CubeUserData[]>([]);
  const refMesh = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!refMesh.current) {
      return;
    }
    if (refMesh.current.count !== refCubeStates.current.length) {
      refCubeStates.current = [];
      for (let i = 0; i < refMesh.current.count; i++) {
        placeholderObject.position.x = getRandomInt(-boundary, boundary);
        placeholderObject.position.y = getRandomInt(-boundary, boundary);
        placeholderObject.position.z = getRandomInt(-boundary, boundary);

        placeholderObject.updateMatrix();
        refMesh.current.setMatrixAt(i, placeholderObject.matrix);
        refMesh.current.setColorAt(
          i,
          Math.random() > 0.5 ? colorBlack : colorPink
        );

        refCubeStates.current.push({
          dir: axis[getRandomInt(0, 2)],
          sign: Math.random() > 0.5 ? 1 : -1,
          remainingDistance: 1,
          speed: getRandomInt(1, 5),
          isWaiting: true,
          currentWaitTime: 0,
          waitTime: 0.5,
          totalDistance: 1,
        });
      }
    }
  }, [cubesAmount, boundary]);

  useFrame((_, delta) => {
    if (!refMesh.current) {
      return;
    }
    for (let i = 0; i < refMesh.current.count; i++) {
      const cubeState = refCubeStates.current[i];
      refMesh.current.getMatrixAt(i, placeholderObject.matrix);
      placeholderObject.position.setFromMatrixPosition(
        placeholderObject.matrix
      );
      if (cubeState.isWaiting) {
        cubeState.currentWaitTime += delta;
        if (cubeState.currentWaitTime >= cubeState.waitTime) {
          cubeState.isWaiting = false;
          cubeState.currentWaitTime = 0;

          cubeState.dir = axis[getRandomInt(0, 2)];

          const negativeSpace = Math.round(
            boundary - placeholderObject.position[cubeState.dir]
          );
          const positiveSpace = Math.round(
            boundary + placeholderObject.position[cubeState.dir]
          );

          if (negativeSpace < cubeState.totalDistance) {
            cubeState.sign = -1;
          } else if (positiveSpace < cubeState.totalDistance) {
            cubeState.sign = 1;
          } else {
            cubeState.sign = Math.random() > 0.5 ? 1 : -1;
          }

          cubeState.remainingDistance = cubeState.totalDistance;
        }
      } else {
        const move = Math.min(
          delta * cubeState.speed,
          cubeState.remainingDistance
        );

        placeholderObject.position[cubeState.dir] += move * cubeState.sign;
        placeholderObject.updateMatrix();
        refMesh.current.setMatrixAt(i, placeholderObject.matrix);
        cubeState.remainingDistance -= move;
        if (cubeState.remainingDistance <= 0) {
          cubeState.isWaiting = true;
        }
      }
    }
    refMesh.current.instanceMatrix.needsUpdate = true;
  });

  // r3f will re-create the mesh every time cubesAmount changes
  return (
    <instancedMesh args={[undefined, undefined, cubesAmount]} ref={refMesh}>
      <boxGeometry />
      <meshBasicMaterial />
    </instancedMesh>
  );
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
