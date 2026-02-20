import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { certifications } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const CertCard = ({ cert, index }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 600,
    });

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
    if (glare) {
      glare.style.background = "transparent";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cert-card group"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Holographic glare overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 z-20 rounded-2xl pointer-events-none transition-all duration-300"
      />

      {/* Animated border glow */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet-500/0 via-cyan-400/0 to-violet-500/0 group-hover:from-violet-500/40 group-hover:via-cyan-400/40 group-hover:to-violet-500/40 transition-all duration-700 blur-[1px]" />

      {/* Card body */}
      <div className="relative z-10 bg-black-100 rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-white/[0.15] transition-all duration-500">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={cert.imgPath}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-100 via-transparent to-transparent" />

          {/* Year badge */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <span className="text-xs font-semibold text-white">{cert.year}</span>
          </div>
        </div>

        {/* Text content */}
        <div className="p-5" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-white font-semibold text-base leading-tight">
            {cert.title}
          </h3>
          <p className="text-white-50/60 text-sm mt-2">{cert.issuer}</p>
        </div>
      </div>
    </div>
  );
};

const Certifications = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".cert-card",
      { y: 50, opacity: 0, rotateX: 15 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="flex-center section-padding"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Validated Expertise"
          sub="Certifications & Awards"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" style={{ perspective: "1000px" }}>
          {certifications.map((cert, index) => (
            <CertCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
