import { ConnectButton, lightTheme } from "thirdweb/react";
import { client } from "../client";
import * as THREE from 'three';
import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { Link } from "react-router-dom";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const MovingStars = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      starsRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.1) * 2;
    }
  });

  return <Stars ref={starsRef} radius={50} count={2500} factor={4} fade speed={2} />;
};

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-950 px-4 py-24 text-gray-200 gap-6"
    >
      <div className="relative z-10 flex flex-col items-center text-center gap-4">
        <span className="inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
        Powered by MediVoice --- Your Voice in Healthcare
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-5xl md:text-7xl">
        Report Healthcare Department Issues Anonymously, Get Community Support
        </h1>
        <p className="max-w-xl text-base md:text-lg leading-relaxed">
        Submit complaints transparently, interact with others, and support — all on a secure decentralized platform using Ethereum.
        </p>

        <ConnectButton
          client={client}
          appMetadata={{
            name: "Example app",
            url: "https://example.com",
          }}
        />
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <MovingStars />
        </Canvas>
      </div>
    </motion.section>
  );
};
