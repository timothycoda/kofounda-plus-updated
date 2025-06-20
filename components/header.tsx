"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto flex w-full shrink-0 items-center justify-between py-6 px-4 lg:px-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl shadow-lg">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
            />
          </svg>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            CODA AI Builder
          </h1>
          <p className="text-xs text-white/60">AI-Powered Development</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="hidden md:flex items-center gap-6"
      >
        <a
          href="#features"
          className="text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          Features
        </a>
        <a
          href="#templates"
          className="text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          Templates
        </a>
        <a
          href="#docs"
          className="text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          Docs
        </a>
      </motion.nav>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white/90 hover:bg-white/15 transition-all duration-200 text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Sign In
        </button>
        
        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </motion.div>
    </motion.header>
  );
}
