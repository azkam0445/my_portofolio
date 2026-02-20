import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logoIconsList } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img
        src={icon.imgPath}
        alt="tech-logo"
        className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-70 hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
};

const LogoShowcase = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div ref={sectionRef} className="md:my-20 my-10 relative">
      <p className="text-center text-white-50 text-sm md:text-base tracking-widest uppercase mb-8">
        Technologies I Work With
      </p>

      <div className="gradient-edge" />
      <div className="gradient-edge" />

      <div className="marquee h-32 md:h-40">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={index} icon={icon} />
          ))}

          {logoIconsList.map((icon, index) => (
            <LogoIcon key={index} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
