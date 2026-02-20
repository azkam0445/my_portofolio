import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { projects, projectCategories } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 800,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image — object-contain on dark bg so every image shows fully */}
      <div className="project-card-img">
        <img
          src={project.imgPath}
          alt={project.title}
          className="max-w-[90%] max-h-[90%] object-contain rounded-lg drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white text-lg font-semibold leading-tight">
          {project.title}
        </h3>
        <p className="text-white-50/60 text-sm leading-relaxed mt-2 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-white/[0.06] text-white-50/70 border border-white/[0.08]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  useGSAP(() => {
    gsap.fromTo(
      ".project-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const handleCategoryChange = useCallback(
    (category) => {
      if (category === activeCategory) return;
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards?.length) {
        gsap.to(cards, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.in",
          onComplete: () => {
            setActiveCategory(category);
            requestAnimationFrame(() => {
              const newCards =
                gridRef.current?.querySelectorAll(".project-card");
              if (newCards?.length) {
                gsap.fromTo(
                  newCards,
                  { opacity: 0, y: 30 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.04,
                    ease: "power2.out",
                  }
                );
              }
            });
          },
        });
      } else {
        setActiveCategory(category);
      }
    },
    [activeCategory]
  );

  return (
    <section id="projects" ref={sectionRef} className="section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="The Full Collection" sub="All Projects" />

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-12">
          {projectCategories.map((cat) => {
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`project-tab ${
                  activeCategory === cat
                    ? "project-tab-active"
                    : "project-tab-inactive"
                }`}
              >
                {cat}
                <span
                  className={`text-xs ml-1.5 px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat
                      ? "bg-white/20"
                      : "bg-white/[0.06] text-white-50/40"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div ref={gridRef} className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
