import { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

const AboutMe = () => {
  const sectionRef = useRef(null);
  const particles = useMemo(() => generateParticles(80), []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=50",
      },
    });

    tl.fromTo(".about-text-behind", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".about-portrait-main", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.4")
      .fromTo(".about-text-front", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.5")
      .fromTo(".about-bottom-section", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Particles background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-violet-900/8 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-indigo-900/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[40%] w-[600px] h-[600px] bg-violet-800/5 rounded-full blur-[180px]" />
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

      {/* Vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/30" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-5 md:px-10 py-4">

        {/* Portrait area */}
        <div className="relative flex flex-col items-center">

          {/* Portrait wrapper — AZKA anchored inside this */}
          <div className="about-portrait-main relative z-[2]">
            <h2 className="about-text-behind about-big-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[65px] md:text-[110px] xl:text-[155px] font-black uppercase tracking-tighter leading-none text-center z-[-1] whitespace-nowrap">
              <span className="about-text-stroke">AZKA</span>
            </h2>

            <div className="absolute -inset-8 bg-violet-600/6 rounded-full blur-[80px] z-[-2]" />
            <img
              src="/images/profile/azka-cutout.png"
              alt="Azka Maulana"
              className="relative w-[280px] md:w-[380px] xl:w-[480px] h-auto object-contain drop-shadow-[0_0_60px_rgba(139,92,246,0.12)]"
            />
          </div>

          {/* "MAULANA" — overlaps bottom of portrait */}
          <div className="relative z-[3] text-center -mt-28 md:-mt-44 xl:-mt-56">
            <h2 className="about-text-front about-big-title text-[65px] md:text-[110px] xl:text-[155px] font-black uppercase tracking-tighter leading-none">
              <span className="about-gradient-text-bold">MAULANA</span>
            </h2>
            <p className="about-text-front text-[11px] md:text-sm tracking-[0.5em] text-white/50 font-mono uppercase mt-1">
              AI Software Engineer
            </p>
          </div>
        </div>

        {/* Bottom section — bio, tags, stats */}
        <div className="about-bottom-section w-full max-w-5xl mx-auto mt-4">
          {/* Bio */}
          <div className="text-center max-w-2xl mx-auto mb-3">
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              I'm <span className="text-white font-bold">Azka Maulana</span>, an
              AI Software Engineer passionate about transforming complex problems into
              elegant, production-ready solutions. I specialize in building LLM-powered
              applications, computer vision systems, and full-stack platforms that serve
              real users at scale.
            </p>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mt-1">
              From deploying AI chatbots serving thousands of university users to
              engineering fraud detection systems and IoT dashboards — I thrive at the
              intersection of artificial intelligence and software craftsmanship.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {[
              "Python", "JavaScript", "TypeScript", "Ruby",
              "React", "Next.js", "Rails", "Laravel", "Node.js", "FastAPI",
              "TensorFlow", "PyTorch", "OpenCV", "LangChain",
              "LLM & RAG", "Computer Vision", "NLP",
              "PostgreSQL", "Firebase", "Docker", "Git",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 text-[10px] md:text-xs font-mono tracking-wider rounded-full border border-white/10 bg-white/5 text-white/60 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {[
              { value: "20+", label: "Projects" },
              { value: "10K+", label: "Users" },
              { value: "3+", label: "Years" },
              { value: "5+", label: "AI Systems" },
            ].map((stat) => (
              <div key={stat.label} className="about-stat-card rounded-lg py-3 px-3 text-center">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs text-white/60 mt-0.5 font-mono tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
