import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = [
  "/videos/programmer-night-1.mp4",
  "/videos/programmer-night-2.mp4",
];

const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

const BehindTheCode = () => {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const ambientRef = useRef(null);
  const isHoveringCenter = useRef(false);
  const particles = useMemo(() => generateParticles(50), []);
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const [activeVideo, setActiveVideo] = useState(0);

  // ── Auto-switch background every 8s when NOT hovering center ──
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveringCenter.current) {
        setActiveVideo((prev) => (prev === 0 ? 1 : 0));
      }
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // ── Initial: hide center frame ──
  useGSAP(() => {
    gsap.set(".btc-center-frame", {
      opacity: 0,
      scale: 0.7,
      pointerEvents: "none",
    });
  }, []);

  // ── Entrance animations ──
  useGSAP(() => {
    const trigger = {
      trigger: sectionRef.current,
      start: "top 80%",
      toggleActions: "play none none reverse",
    };

    gsap.fromTo(
      ".btc-title-left .btc-word",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: trigger,
      }
    );

    gsap.fromTo(
      ".btc-title-right .btc-word",
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: trigger,
      }
    );

    gsap.fromTo(
      ".btc-fade-in",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: trigger,
      }
    );
  }, []);

  // ── Section mouse: ambient glow + center proximity ──
  const handleSectionMouseMove = useCallback(
    (e) => {
      if (isMobile || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Ambient glow
      if (ambientRef.current) {
        const px = (mouseX / rect.width) * 100;
        const py = (mouseY / rect.height) * 100;
        ambientRef.current.style.background = `radial-gradient(600px circle at ${px}% ${py}%, rgba(139,92,246,0.08), transparent 60%)`;
      }

      // Center proximity detection
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const dist = Math.sqrt(
        (mouseX - centerX) ** 2 + (mouseY - centerY) ** 2
      );
      const threshold = Math.min(rect.width, rect.height) * 0.22;

      if (dist < threshold && !isHoveringCenter.current) {
        isHoveringCenter.current = true;
        gsap.to(".btc-center-frame", {
          opacity: 1,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "back.out(1.7)",
          overwrite: true,
        });
      } else if (
        dist >= threshold * 1.3 &&
        isHoveringCenter.current
      ) {
        isHoveringCenter.current = false;
        gsap.to(".btc-center-frame", {
          opacity: 0,
          scale: 0.7,
          pointerEvents: "none",
          duration: 0.4,
          ease: "power2.in",
          overwrite: true,
        });
      }
    },
    [isMobile]
  );

  const handleSectionMouseLeave = useCallback(() => {
    if (isMobile) return;
    isHoveringCenter.current = false;
    if (ambientRef.current) ambientRef.current.style.background = "";
    gsap.to(".btc-center-frame", {
      opacity: 0,
      scale: 0.7,
      pointerEvents: "none",
      duration: 0.4,
      ease: "power2.in",
      overwrite: true,
    });
  }, [isMobile]);

  // ── Mouse tilt on floating frame ──
  const handleFrameMouseMove = useCallback(
    (e) => {
      if (isMobile) return;
      const frame = frameRef.current;
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(frame, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
      });
    },
    [isMobile]
  );

  const handleFrameMouseLeave = useCallback(() => {
    if (isMobile) return;
    const frame = frameRef.current;
    if (!frame) return;
    gsap.to(frame, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [isMobile]);

  // ── Click frame to switch video ──
  const handleFrameClick = useCallback(() => {
    gsap.fromTo(
      frameRef.current,
      { scale: 0.92 },
      { scale: 1, duration: 0.35, ease: "back.out(2)" }
    );
    setActiveVideo((prev) => (prev === 0 ? 1 : 0));
  }, []);

  return (
    <section
      id="behind-the-code"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ════════ BACKGROUND VIDEOS (crossfade) ════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden btc-bg-zoom">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
            activeVideo === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={VIDEOS[0]} type="video/mp4" />
        </video>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${
            activeVideo === 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={VIDEOS[1]} type="video/mp4" />
        </video>
      </div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-[1] bg-black/50" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* ── Mouse ambient glow ── */}
      <div
        ref={ambientRef}
        className="absolute inset-0 z-[2] pointer-events-none"
      />

      {/* ── Sparkle particles ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="sparkle absolute rounded-full bg-white"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ════════ TOP-LEFT: TITLE ════════ */}
      <div className="btc-title-left absolute top-16 md:top-20 left-5 md:left-12 z-10">
        {/* Badge */}
        <div className="btc-fade-in inline-flex items-center gap-2 mb-5 md:mb-7 px-4 py-1.5 rounded-full border border-violet-400/25 bg-violet-500/10 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-violet-300 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
            Behind The Code
          </span>
        </div>

        {/* Main title */}
        <h2
          className="btc-word text-[15vw] md:text-[11vw] font-black uppercase leading-[0.88] tracking-tighter text-white"
          style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}
        >
          LATE
        </h2>
        <h2
          className="btc-word text-[15vw] md:text-[11vw] font-black uppercase leading-[0.88] tracking-tighter text-white mt-[-1vw]"
          style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}
        >
          NIGHTS
        </h2>

        {/* Subtitle */}
        <div className="btc-fade-in mt-5 md:mt-7 flex flex-col gap-2">
          <div className="w-10 h-[2px] bg-gradient-to-r from-violet-500/60 to-transparent" />
          <p className="text-white/60 text-[11px] md:text-sm font-light max-w-[280px] md:max-w-[340px] leading-relaxed">
            This is where AI systems come to life
            <span className="text-violet-400/80"> — </span>
            training models, shipping features,
            <br className="hidden md:block" />
            building the future, one commit at a time.
          </p>
        </div>
      </div>

      {/* ════════ CENTER: FLOATING FRAME (hidden by default) ════════ */}
      <div
        className="btc-center-frame absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ perspective: "1000px" }}
      >
        <div className="btc-float">
          <div
            ref={frameRef}
            onClick={handleFrameClick}
            onMouseMove={handleFrameMouseMove}
            onMouseLeave={handleFrameMouseLeave}
            className="relative p-[2px] rounded-xl overflow-hidden cursor-pointer group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Spinning gradient border */}
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] btc-border-glow z-0" />

            {/* Frame content */}
            <div className="relative z-10 rounded-xl overflow-hidden bg-[#0a0a14]">
              {/* HUD corners */}
              <div className="btc-hud-corner btc-hud-tl" />
              <div className="btc-hud-corner btc-hud-tr" />
              <div className="btc-hud-corner btc-hud-bl" />
              <div className="btc-hud-corner btc-hud-br" />

              {/* Videos — shows the OPPOSITE of background */}
              <div className="relative w-[220px] md:w-[300px] lg:w-[340px] aspect-[3/4]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
                    activeVideo === 1 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <source src={VIDEOS[0]} type="video/mp4" />
                </video>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${
                    activeVideo === 0 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <source src={VIDEOS[1]} type="video/mp4" />
                </video>
              </div>

              {/* Switch indicator on hover */}
              <div className="absolute inset-0 z-[5] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                  <span className="text-[10px] text-white font-mono tracking-wider uppercase">
                    Switch
                  </span>
                </div>
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 z-[2] pointer-events-none btc-scanline" />
              <div className="absolute inset-0 z-[4] pointer-events-none btc-shimmer" />
              <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>
          </div>
        </div>

        {/* Glow underneath */}
        <div className="absolute -bottom-6 left-[10%] right-[10%] h-20 bg-violet-600/15 blur-[40px] rounded-full" />
      </div>

      {/* ════════ BOTTOM-RIGHT: TITLE ════════ */}
      <div className="btc-title-right absolute bottom-8 md:bottom-14 right-5 md:right-12 z-30 text-right">
        <h2
          className="btc-word text-[15vw] md:text-[11vw] font-black uppercase leading-[0.88] tracking-tighter text-white"
          style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}
        >
          REAL
        </h2>
        <h2 className="btc-word text-[15vw] md:text-[11vw] font-black uppercase leading-[0.88] tracking-tighter btc-gradient-text mt-[-1vw]">
          IMPACT
        </h2>
      </div>
    </section>
  );
};

export default BehindTheCode;
