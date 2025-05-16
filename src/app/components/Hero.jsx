import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="w-full py-20 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            <span className="block">Simplicity is the</span>
            <span className="block">ultimate sophistication</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of elegance and functionality with Hermes.
          </p>
        </div>
        
        <div className="relative">
          <div className="aspect-video w-full max-w-5xl mx-auto">
            <Image
              src="/images/hero-product.jpg"
              alt="Hermes flagship product"
              fill
              className="object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
        
        <div className="flex justify-center gap-6 mt-12">
          <Link 
            href="#services-section" 
            className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
          >
            Explore
          </Link>
          <Link 
            href="#footer-section" 
            className="bg-transparent border border-gray-300 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;