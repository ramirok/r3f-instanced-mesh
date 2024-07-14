import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { OrbitControls, Stats } from "@react-three/drei";
import UI from "./UI";

function App() {
  return (
    <div className="h-screen w-screen bg-neutral-600 relative">
      <Canvas camera={{ position: [70, 0, -70], fov: 60 }}>
        <Scene />
        <OrbitControls />
        <Stats />
      </Canvas>
      <UI />
    </div>
  );
}

export default App;
