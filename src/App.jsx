import { Physics } from "@react-three/rapier";
import Streets from "./models/Streets";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { HumanController } from "./models/HumanController";
import Navmesh from "./models/Navmesh";
import City from './models/City'
import { vec3 } from "@react-three/rapier";

const App = () => {
  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    const screenPosition = [0, 0, 0];

    if (window.innerWidth < 768) {
      screenScale = [1, 1, 1];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition];
  };
  const [position, setPosition] = useState( vec3({
    x: 0,
    y: 0,
    z: 5,
  }));

  const [impulse, setImpulse] = useState( vec3({
    x: 0,
    y: 0,
    z: 0,
  }));

  const [islandScale, islandPosition] =
    adjustIslandForScreenSize();
  return (
    <section className="w-full h-screen">
      <Canvas
        className={"w-full h-screen bg-transparent"}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense>
          <Physics debug>
            <Streets scale={islandScale} position={islandPosition}/>
            <Navmesh humanPosition={position} setHumanPosition={setPosition} scale={islandScale} position={islandPosition}  setImpulse={setImpulse}/>
            <OrbitControls />
            <HumanController position={position} impulse = {impulse}/>
            <directionalLight position={[1, 1, 1]} intensity={3} />
            <ambientLight intensity={0.5} />
          </Physics>
        </Suspense>
      </Canvas>
    </section>
  );
};

export default App;
