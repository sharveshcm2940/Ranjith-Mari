import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import Achievements from './components/Achievements';
import Publications from './components/Publications';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import DentalPlanner from './components/DentalPlanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DentalChatbot from './components/DentalChatbot';

// New Bespoke Human-Crafted Components
import PatientEducation from './components/PatientEducation';
import VirtualTour from './components/VirtualTour';
import Gallery from './components/Gallery';
import CookieManager from './components/CookieManager';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll progress listener
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    // Ambient mouse coordinates follower tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-200 z-50 pointer-events-none">
        <motion.div
          className="h-full bg-brand-blue rounded-r-full"
          style={{ width: `${scrollProgress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative selection:bg-brand-blue/20"
          >
            {/* Interactive Dynamic Mouse Cursor Gradient Aura behind elements */}
            <div 
              className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 hidden lg:block opacity-45"
              style={{
                background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 80%)`
              }}
            />

            {/* Sticky Navigation */}
            <Navbar />

            {/* Core Sections */}
            <main>
              {/* 1. Hero Section */}
              <Hero />

              {/* 2. About Me Section */}
              <About />

              {/* 3. Professional Experience Section */}
              <Experience />

              {/* 4. Areas of Expertise Section */}
              <Expertise />

              {/* 4b. Patient Education Resource Library */}
              <PatientEducation />

              {/* 8. Achievements Stats Section */}
              <Achievements />

              {/* 5, 6. Academic & Publications (Research) Section */}
              <Publications />

              {/* 7. Skills progression Section */}
              <Skills />

              {/* 9b. Virtual Clinic Tour Walks */}
              <VirtualTour />

              {/* 9c. Instagram Media Gallery */}
              <Gallery />

              {/* 10. Testimonials Slider Section */}
              <Testimonials />

              {/* FAQ Section */}
              <FAQ />

              {/* Interactive Smile Assessor & Treatment Planner Section */}
              <DentalPlanner />

              {/* 11, 12. Contact details & Form Section */}
              <Contact />
            </main>

            {/* 13. Footer with quick navigators */}
            <Footer />

            {/* Floating Dental AI Assistant Chatbot */}
            <DentalChatbot />

            {/* Cookies Consent & Optimization Manager */}
            <CookieManager />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
