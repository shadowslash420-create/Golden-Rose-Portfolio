import React from "react";
import { motion } from "framer-motion";

export const RoseFrame = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-4 md:p-6 group ${className}`}
    >
      {/* Top Left Rose */}
      <svg className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 text-primary/40 transform -rotate-90 transition-transform duration-700 group-hover:scale-110 group-hover:text-primary/60" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50,10 C25,10 10,25 10,50 C10,65 20,75 35,78 C30,60 40,40 50,30 C60,40 70,60 65,78 C80,75 90,65 90,50 C90,25 75,10 50,10 Z" />
        <path d="M50,35 C45,45 35,55 40,70 C45,65 55,65 60,70 C65,55 55,45 50,35 Z" opacity="0.6"/>
      </svg>
      
      {/* Bottom Right Rose */}
      <svg className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 text-primary/40 transform rotate-90 transition-transform duration-700 group-hover:scale-110 group-hover:text-primary/60" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50,10 C25,10 10,25 10,50 C10,65 20,75 35,78 C30,60 40,40 50,30 C60,40 70,60 65,78 C80,75 90,65 90,50 C90,25 75,10 50,10 Z" />
        <path d="M50,35 C45,45 35,55 40,70 C45,65 55,65 60,70 C65,55 55,45 50,35 Z" opacity="0.6"/>
      </svg>
      
      {/* Main Image Container shaped like a soft petal */}
      <div className="relative overflow-hidden rounded-t-[50px] md:rounded-t-[80px] rounded-b-[30px] md:rounded-b-[40px] border-2 md:border-4 border-primary/10 shadow-lg transition-all duration-700 group-hover:shadow-primary/20 group-hover:border-primary/30 bg-accent/30 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export const Divider = () => {
  return (
    <div className="flex items-center justify-center gap-4 my-16 md:my-24 opacity-60">
      <div className="h-[1px] w-16 md:w-32 bg-primary/30" />
      <svg className="w-6 h-6 text-primary/60" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50,10 C25,10 10,25 10,50 C10,65 20,75 35,78 C30,60 40,40 50,30 C60,40 70,60 65,78 C80,75 90,65 90,50 C90,25 75,10 50,10 Z" />
        <path d="M50,35 C45,45 35,55 40,70 C45,65 55,65 60,70 C65,55 55,45 50,35 Z" opacity="0.6"/>
      </svg>
      <div className="h-[1px] w-16 md:w-32 bg-primary/30" />
    </div>
  );
};