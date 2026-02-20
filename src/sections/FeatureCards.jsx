import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { abilities } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
  const cardsRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".feature-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div ref={cardsRef} className="w-full padding-x-lg">
      <div className="mx-auto grid-3-cols">
        {abilities.map(({ imgPath, title, desc }, index) => (
          <div
            key={title}
            className="feature-card card-border rounded-xl p-8 flex flex-col gap-4 group hover:border-white/20 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="size-14 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                <img src={imgPath} alt={title} className="size-8" />
              </div>
              <h3 className="text-white text-2xl font-semibold mt-4">{title}</h3>
              <p className="text-white-50 text-lg mt-3">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
