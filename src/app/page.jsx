"use client";
import { useState, useEffect, useRef } from "react";
import Hero from "@/app/components/Hero.jsx";
import ServicesPage from "@/app/components/ServicesPage.jsx";
import Pricing from "@/app/components/Pricing.jsx";
import Contact from "@/app/components/Contact.jsx";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import ScrollToTopOnRefresh from "@/app/components/ScrollToTopOnRefresh";
import { motion } from "framer-motion";

export default function Home() {
  const scrollContainerRef = useRef(null);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState("hero-section");
  
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
  }, []);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <ScrollToTopOnRefresh />
      
      {/* Navbar Component */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      
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
