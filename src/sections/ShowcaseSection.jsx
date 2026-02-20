import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    const cards = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <TitleHeader title="Engineered with Purpose" sub="Featured Work" />

        <div className="showcaselayout mt-16">
          {/* LEFT — Main featured project (tall container) */}
          <div ref={project1Ref} className="first-project-wrapper">
            <div className="image-wrapper">
              <img
                src="/images/projects/ai/chatbot-rag.png"
                alt="AI Chatbot with RAG"
              />
            </div>
            <div className="text-content">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  LangChain
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Pinecone
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OpenAI
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Vector DB
                </span>
              </div>
              <h2>
                AI Chatbot with RAG — Retrieval-Augmented Generation
                for Intelligent Document Q&A
              </h2>
              <p className="text-white-50 md:text-xl">
                A production-ready chatbot that answers questions from uploaded
                documents using Pinecone/Chroma vector databases, LLM APIs,
                and role-based access control.
              </p>
            </div>
          </div>

          {/* RIGHT — Two stacked projects */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#0d1117]">
                <img
                  src="/images/projects/web/elibrary-badge-admin.jpeg"
                  alt="E-Library Primagraha"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Laravel
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  AI Chatbot
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  PostgreSQL
                </span>
              </div>
              <h2>E-Library Primagraha — AI-Powered Digital Library</h2>
              <p className="text-white-50 text-sm mt-1">
                Full-featured digital library with AI assistant, badge
                gamification, academic repository & BANPT reporting.
              </p>
            </div>

            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#e8edf3]">
                <img
                  src="/images/projects/web/warunkconnect-analytics.png"
                  alt="WarunkConnect Analytics"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  Ruby on Rails
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  PostgreSQL
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Analytics
                </span>
              </div>
              <h2>WarunkConnect — Business Analytics Dashboard</h2>
              <p className="text-white-50 text-sm mt-1">
                Revenue analytics, portfolio tracking & growth metrics
                with real-time data visualization for businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
