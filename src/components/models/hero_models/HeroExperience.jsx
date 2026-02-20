import { useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import CameraController from "./CameraController";

const HeroExperience = ({ onEntryComplete, onZoomComplete }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const controlsRef = useRef();
  const [phase, setPhase] = useState("entry");
  const [monitorPos, setMonitorPos] = useState(null);

  const handleEntryDone = useCallback(() => {
    setPhase("explore");
    onEntryComplete?.();
  }, [onEntryComplete]);

  const handleMonitorPositionReady = useCallback((data) => {
    setMonitorPos(data);
  }, []);

  const handleMonitorClick = useCallback(() => {
    if (phase !== "explore" || !monitorPos) return;
    setPhase("zooming");
    if (controlsRef.current) controlsRef.current.enabled = false;
  }, [phase, monitorPos]);

  const handleZoomDone = useCallback(() => {
    setPhase("done");
    onZoomComplete?.();
  }, [onZoomComplete]);

  return (
    <Canvas camera={{ position: [20, 15, 25], fov: 45 }}>
      <ambientLight intensity={0.2} color="#1a1a40" />
      <fog attach="fog" args={["#000000", 15, 35]} />

      <OrbitControls
        ref={controlsRef}
        enabled={phase === "explore"}
        enablePan={false}
        enableZoom={!isMobile}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
      />

      <CameraController
        phase={phase}
        monitorPos={monitorPos}
        onEntryComplete={handleEntryDone}
        onZoomComplete={handleZoomDone}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={150} />
        <group
          scale={isMobile ? 0.7 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room
            onMonitorClick={handleMonitorClick}
            onMonitorPositionReady={handleMonitorPositionReady}
          />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
