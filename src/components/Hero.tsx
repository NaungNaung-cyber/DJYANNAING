import React from 'react';
import { motion } from 'motion/react';
import { Radio } from 'lucide-react';

const logo = new URL('../assets/logo.png', import.meta.url).href;

export function Hero() {
  const discFrame = {
    width: 'clamp(12rem, calc(min(100vw, 100vh) * 0.7), 36rem)',
    height: 'clamp(18rem, calc(min(100vw, 100vh) * 0.7), 36rem)',
  };

  const innerColumn = {
    width: '72%',
    minWidth: '14rem',
    maxWidth: '26rem',
    transform: 'translateY(20%)',
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start snap-always">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-4 max-w-[20rem] mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center"
          >
            <div
              className="relative aspect-square mx-auto flex items-center justify-center"
              style={discFrame}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { delayChildren: 0.7, staggerChildren: 0.15 },
                  },
                }}
                className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 px-3 text-center mx-auto"
                style={innerColumn}
              >
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 0 },
                    visible: { opacity: 1, y: -20 },
                  }}
                  className="text-[min(5rem,15vw)] tracking-wider text-white font-medium"
                  style={{ fontFamily: '"Orbitron", sans-serif', fontWeight: 800 }}
                >
                  DJ YAN NAING
                </motion.h1>

                <motion.img
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1.5 },
                  }}
                  transition={{ duration: 0.6 }}
                  src={logo}
                  alt="DJ YAN NAING Logo"
                  className="mx-auto drop-shadow-2xl w-[96%] sm:w-full"
                />

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 20 },
                  }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="flex items-center justify-center gap-[0.5em] text-cyan-300">
                    <Radio className="w-[min(0.5rem,2.2vw)] h-[min(0.5rem,2.2vw)] animate-pulse" />
                    <p className="text-[min(0.5rem,2.2vw)] tracking-widest uppercase whitespace-nowrap">
                      DJ • Producer • 20+ Years Experience
                    </p>
                  </div>
                  <p className="text-gray-400 text-[min(0.5rem,2.2vw)] leading-snug text-center">
                    Master of sound, pioneering the cosmic soundscape for over two decades
                    <br />
                    
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="pt-8"
          >
            <button 
              onClick={() => document.getElementById('legacy')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 uppercase tracking-wider"
            >
              Start The Journey
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
