import { useMemo, useState } from "react";
import * as THREE from "three";
import { useStore } from "./store";

const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
  linewidth: 2,
  transparent: true,
  opacity: 0.5,
});

export default function BoundaryLines() {
  const boundary = useStore((state) => state.boundary);
  const [initialBoundary] = useState(30);
  const geometry = useMemo(
    () =>
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-initialBoundary, -initialBoundary, -initialBoundary),
        new THREE.Vector3(initialBoundary, -initialBoundary, -initialBoundary),
        new THREE.Vector3(initialBoundary, -initialBoundary, initialBoundary),
        new THREE.Vector3(-initialBoundary, -initialBoundary, initialBoundary),
        new THREE.Vector3(-initialBoundary, -initialBoundary, -initialBoundary),
      ]),
    [initialBoundary]
  );
  const lowerLine = useMemo(
    () => new THREE.Line(geometry, lineMaterial),
    [geometry]
  );
  const upperLine = useMemo(() => lowerLine.clone(), [lowerLine]);

  return (
    <group
      scale={[
        boundary / initialBoundary,
        boundary / initialBoundary,
        boundary / initialBoundary,
      ]}
    >
      <group position={[0, initialBoundary * 2, 0]}>
        <primitive object={upperLine} />
      </group>
      <primitive object={lowerLine} />
    </group>
  );
}
