"use client";
import { useState, useEffect, useRef, Suspense, lazy } from "react";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero.jsx";
import ScrollToTopOnRefresh from "@/app/components/ScrollToTopOnRefresh";
import { motion } from "framer-motion";

// Lazy load components ที่ใหญ่และไม่จำเป็นสำหรับการแสดงผลครั้งแรก
const ServicesPage = lazy(() => import("@/app/components/ServicesPage.jsx"));
const Pricing = lazy(() => import("@/app/components/Pricing.jsx"));
const Contact = lazy(() => import("@/app/components/Contact.jsx"));
const Footer = lazy(() => import("@/app/components/Footer"));

// Loading placeholders สำหรับ lazy-loaded components
const LoadingSection = ({ height = "min-h-screen", text = "Loading..." }) => (
  <div className={`${height} flex items-center justify-center`}>
    <div className="flex flex-col items-center space-y-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      <p className="text-gray-500">{text}</p>
    </div>
  </div>
);

export default function Home() {
  const scrollContainerRef = useRef(null);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState("hero-section");
  const [hasScrolled, setHasScrolled] = useState(false);
  
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
    
    // ตรวจสอบว่าผู้ใช้ได้เลื่อนหน้าจอหรือยัง
    if (scrollTop > 10 && !hasScrolled) {
      setHasScrolled(true);
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
  }, [hasScrolled]);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      if (!hasScrolled) {
        setHasScrolled(true);
      }
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
          <Suspense fallback={<LoadingSection text="Loading services..." />}>
            <ServicesPage />
          </Suspense>
        </section>

        <section className="snap-start min-h-screen flex items-center px-6" id="pricing-section">
          <Suspense fallback={<LoadingSection text="Loading pricing information..." />}>
            <Pricing />
          </Suspense>
        </section>

        <section className="snap-start min-h-screen mx-auto items-center px-6" id="contact-section">
          <Suspense fallback={<LoadingSection text="Loading contact form..." />}>
            <Contact />
          </Suspense>
        </section>
        
        <section className="snap-start pt-12 bg-gray-50/50" id="footer-section">
          <Suspense fallback={<LoadingSection height="min-h-[300px]" text="Loading footer..." />}>
            <Footer />
          </Suspense>
        </section>
      </div>
    </>
  );
}
