import { useState, useCallback, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

// Generate sparkles spread across entire hero
const generateSparkles = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 3 + 2,
  }));
};

const Hero = () => {
  const [roomVisible, setRoomVisible] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const sparkles = useMemo(() => generateSparkles(150), []);

  // Lock scroll while room is visible
  useEffect(() => {
    if (roomVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [roomVisible]);

  // Animate hero text after room is dismissed
  useGSAP(() => {
    if (roomVisible) return;
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  }, [roomVisible]);

  const handleEntryComplete = useCallback(() => {
    setShowHint(true);
  }, []);

  const handleZoomComplete = useCallback(() => {
    setShowHint(false);

    gsap.to(".hero-transition-overlay", {
      opacity: 1,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        setRoomVisible(false);
        document.body.style.cursor = "default";

        gsap.to(".hero-transition-overlay", {
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
        });
      },
    });
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Fixed fullscreen 3D room intro */}
      {roomVisible && (
        <div className="fixed inset-0 z-[110] bg-black">
          <HeroExperience
            onEntryComplete={handleEntryComplete}
            onZoomComplete={handleZoomComplete}
          />

          {showHint && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
              <span className="text-white-50 text-sm tracking-widest uppercase animate-pulse">
                Click the monitor to enter
              </span>
              <svg
                width="24"
                height="36"
                viewBox="0 0 24 36"
                fill="none"
                className="opacity-50"
              >
                <rect
                  x="1"
                  y="1"
                  width="22"
                  height="34"
                  rx="11"
                  stroke="rgba(217,236,255,0.5)"
                  strokeWidth="2"
                />
                <circle cx="12" cy="10" r="2" fill="rgba(217,236,255,0.7)" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Transition flash overlay */}
      <div className="hero-transition-overlay fixed inset-0 z-[120] pointer-events-none opacity-0 bg-white" />

      {/* Background grid image */}
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Turning
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Scalable Apps</h1>
              <h1>that Drive Impact</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none max-w-xl">
              Hi, I'm Azka — AI Software Engineer building
              <br className="hidden md:block" />
              production-grade LLM-powered applications.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: Video — blended with background */}
        <figure>
          <div className="xl:w-[45%] w-full h-full min-h-[50vh] absolute xl:top-0 top-24 right-0 hero-video-blend">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
        </figure>

        {/* Sparkles — spread across entire hero */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="sparkle absolute rounded-full bg-white"
              style={{
                left: s.left,
                top: s.top,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
