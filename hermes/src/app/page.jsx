"use client";
import { useState, useEffect, useRef } from "react";
import Hero from "@/app/components/Hero.jsx";
import ServicesPage from "@/app/components/ServicesPage.jsx";
import Pricing from "@/app/components/Pricing.jsx";
import Contact from "@/app/components/Contact.jsx";
import Footer from "@/app/components/Footer";
import ScrollToTopOnRefresh from "@/app/components/ScrollToTopOnRefresh";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const scrollContainerRef = useRef(null);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState("hero-section");
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef?.current) return;

    const scrollTop = scrollContainerRef.current.scrollTop;
    const scrollHeight = scrollContainerRef.current.scrollHeight;
    const screenHeight = window.innerHeight;

    const scrollProgress = scrollTop / (scrollHeight - screenHeight);
    const fadeThreshold = 0.08;
    
    if (scrollProgress >= fadeThreshold) {
      setLogoOpacity(0);
    } else {
      const newOpacity = 1 - scrollProgress * 3;
      setLogoOpacity(Math.max(0, newOpacity));
    }
    
    const sections = ["hero-section", "services-section", "pricing-section", "contact-section"];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;
      
      const rect = element.getBoundingClientRect();
      if (rect.top <= screenHeight / 2 && rect.bottom >= screenHeight / 2) {
        setActiveSection(section);
        break;
      }
    }
  };

  useEffect(() => {
    const scrollDiv = scrollContainerRef?.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isMobile]);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <ScrollToTopOnRefresh />
      
      {/* Apple-style Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/50 transition-all duration-300 ${
        activeSection !== "hero-section" ? "shadow-none border-b border-gray-100" : ""
      }`}>
        {isMobile ? (
          <div className="flex justify-between items-center p-5">
            <img 
              src="/images/Only-Hermes-Dev-Logo.png" 
              className="h-5" 
              alt="Logo" 
            />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto flex justify-between items-center px-10 py-4">
            <img 
              src="/images/Only-Hermes-Dev-Logo.png" 
              className="h-5" 
              alt="Logo" 
            />
            <nav className="flex gap-10">
              {["Home", "Services", "Pricing", "Contact"].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(`${item.toLowerCase()}-section`)}
                  className={`text-sm font-light tracking-wide transition-colors ${
                    activeSection === `${item.toLowerCase()}-section` 
                      ? "text-black" 
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-14 z-40 bg-white/90 backdrop-blur-lg"
          >
            <div className="flex flex-col py-3">
              {["Home", "Services", "Pricing", "Contact"].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(`${item.toLowerCase()}-section`)}
                  className={`py-4 px-6 text-center font-light ${
                    activeSection === `${item.toLowerCase()}-section` 
                      ? "text-black" 
                      : "text-gray-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory"
      >
        <section className="min-h-screen pt-24 flex flex-col justify-center items-center snap-start" id="hero-section">

          
          <Hero scrollContainerRef={scrollContainerRef} />
        </section>

        <section className="snap-start min-h-screen flex items-center px-6" id="services-section">
          <ServicesPage />
        </section>

        <section className="snap-start min-h-screen flex items-center px-6" id="pricing-section">
          <Pricing />
        </section>

        <section className="snap-start min-h-screen mx-auto items-center px-6" id="contact-section">
          <Contact />
        </section>
        
        <section className="snap-start pt-12 bg-gray-50/50" id="footer-section">
          <Footer />
        </section>
      </div>
    </>
  );
}
