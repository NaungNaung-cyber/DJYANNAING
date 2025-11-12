import { motion } from 'motion/react';
import React from 'react';
import { Video } from 'lucide-react';

export function VideoSection() {
  return (
    <section className="relative py-20 sm:py-32 snap-start snap-always">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
                <Video 
                  className="w-12 h-12 text-white relative" 
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
                  }}
                />
              </div>
            </motion.div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl mb-4 text-white"
              style={{ 
                fontFamily: '"DM Serif Text", serif',
                textShadow: '0 8px 24px rgba(0, 0, 0, 0.7), 0 16px 48px rgba(0, 0, 0, 0.5)',
              }}
            >
              Videos
            </h2>
            <p 
              className="text-white max-w-2xl mx-auto"
              style={{
                textShadow: '0 6px 18px rgba(0, 0, 0, 0.6), 0 12px 36px rgba(0, 0, 0, 0.4)',
              }}
            >
              Experience the visual journey through space and sound
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-pink-500/10"
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/50">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Z-DXsngZ0pA?modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3&fs=0&playsinline=1"
                  title="DJ Yan Naing - Performance"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full aspect-video"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-pink-500/10"
            >
              <div className="relative rounded-2xl overflow-hidden bg-black/50">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/rkYqdlzuI68?modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3&fs=0&playsinline=1"
                  title="DJ Yan Naing - Live Performance"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full aspect-video"
                />
              </div>
            </motion.div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
