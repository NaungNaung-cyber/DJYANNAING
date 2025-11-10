import React from 'react';
import { motion } from 'motion/react';
import { Radio } from 'lucide-react';

const logo = new URL('../assets/0393e9e42abe1a7723f891db3490e3d220cfbb21.png', import.meta.url).href;

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start snap-always">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/50 blur-3xl rounded-full animate-pulse" />
              <img 
                src={logo} 
                alt="DJ YAN NAING Logo" 
                className="w-48 h-auto sm:w-64 md:w-80 lg:w-96 relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider"
            style={{
              background: 'linear-gradient(to right, #ef4444, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DJ YAN NAING
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex items-center justify-center gap-3 text-cyan-300"
          >
            <Radio className="w-5 h-5 animate-pulse" />
            <p className="text-lg sm:text-xl md:text-2xl tracking-widest uppercase">
              DJ • Producer • 20+ Years Experience
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-4"
          >
            Master of sound, pioneering the cosmic soundscape for over two decades
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="pt-8"
          >
            <button 
              onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 uppercase tracking-wider"
            >
              Enter The Universe
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
