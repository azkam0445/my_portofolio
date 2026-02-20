import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

const LOOK_AT = new THREE.Vector3(0, 0, 0);

const CameraController = ({
  phase,
  monitorPos,
  onEntryComplete,
  onZoomComplete,
}) => {
  const { camera } = useThree();
  const tlRef = useRef(null);

  // Entry animation - fly in from far to resting isometric view
  useEffect(() => {
    camera.position.set(20, 15, 25);
    camera.lookAt(LOOK_AT);

    tlRef.current = gsap.timeline({ onComplete: onEntryComplete });

    tlRef.current.to(camera.position, {
      x: 0,
      y: 2,
      z: 15,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(LOOK_AT),
    });

    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  // Zoom into monitor when user clicks it
  useEffect(() => {
    if (phase !== "zooming" || !monitorPos) return;

    const { center, faceDir } = monitorPos;

    // Mid: 6 units in front of monitors — see both monitors framed nicely
    const mid = center.clone().addScaledVector(faceDir, 6);
    mid.y = center.y + 0.5; // slightly above center for natural angle

    // Close: 1.5 units — monitors fill viewport before white flash
    const close = center.clone().addScaledVector(faceDir, 1.5);
    close.y = center.y + 0.1;

    const tl = gsap.timeline({ onComplete: onZoomComplete });

    // Step 1: Move to front of monitors
    tl.to(camera.position, {
      x: mid.x,
      y: mid.y,
      z: mid.z,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(center),
    });

    // Step 2: Zoom close into screens
    tl.to(camera.position, {
      x: close.x,
      y: close.y,
      z: close.z,
      duration: 0.8,
      ease: "power2.in",
      onUpdate: () => camera.lookAt(center),
    });

    tlRef.current = tl;
    return () => tl.kill();
  }, [phase, monitorPos]);

  return null;
};

export default CameraController;
