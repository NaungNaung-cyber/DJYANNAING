import React from 'react';
import { motion } from 'motion/react';
import { Disc3 } from 'lucide-react';

export function MusicPlayer() {
  return (
    <section id="music" className="relative py-20 sm:py-32 snap-start snap-always">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 360 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full" />
                <Disc3 
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
              Latest Tracks
            </h2>
            <p 
              className="text-white max-w-2xl mx-auto"
              style={{
                textShadow: '0 6px 18px rgba(0, 0, 0, 0.6), 0 12px 36px rgba(0, 0, 0, 0.4)',
              }}
            >
              Stream the latest cosmic soundscapes
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-4 sm:p-8 shadow-2xl shadow-cyan-500/10"
          >
            <div className="w-full rounded-2xl overflow-hidden bg-black/30">
              <iframe
                style={{ borderRadius: '10px' }}
                scrolling="no"
                id="hearthis_at_user_djyannaing"
                width="100%"
                height="350"
                src="https://app.hearthis.at/djyannaing/embed/?hcolor=ba1010&css=&skin=black"
                frameBorder="0"
                allowTransparency
                title="DJ Yan Naing on HearThis"
                className="w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
          >
            {[
              { label: 'Years Experience', value: '20+' },
              { label: 'Live Sets', value: '500+' },
              { label: 'Fans Worldwide', value: '50K+' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
