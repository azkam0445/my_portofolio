import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import ProjectsGallery from "./sections/ProjectsGallery";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Certifications from "./sections/Certifications";
import AboutMe from "./sections/AboutMe";
import BehindTheCode from "./sections/BehindTheCode";
import Navbar from "./components/NavBar";

const App = () => (
  <>
    <Navbar />
    <Hero />
    <AboutMe />
    <BehindTheCode />
    <ShowcaseSection />
    <ProjectsGallery />
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <Certifications />
    <Testimonials />
    <TechStack />
    <Contact />
    <Footer />
  </>
);

export default App;
