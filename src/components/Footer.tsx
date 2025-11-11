import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Music, Mail, PhoneCall, Facebook } from 'lucide-react';

const logo = new URL('../assets/0393e9e42abe1a7723f891db3490e3d220cfbb21.png', import.meta.url).href;

export function Footer() {
  const socialLinks = [
    { icon: Music, label: 'HearThis', href: 'https://hearthis.at/djyannaing/', color: 'hover:text-orange-400' },
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/djyannaing', color: 'hover:text-blue-400' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/real_yan_naing/?igsh=dTNhdjJkZnRsN3N6&utm_source=qr#', color: 'hover:text-pink-400' },
    { icon: Mail, label: 'Email', href: 'mailto:djyannaing305@gmail.com', color: 'hover:text-cyan-400' },
  ];

  return (
    <footer className="relative py-16 sm:py-20 border-t border-purple-500/20 snap-start snap-always">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="DJ YAN NAING Logo" 
              className="w-48 h-auto mx-auto mb-6 opacity-80"
            />
            <h3 className="text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              Connect With DJ YAN NAING
            </h3>
            <p className="text-gray-400">
              Follow the cosmic journey through space and sound
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 mb-12">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className={`bg-gradient-to-br from-purple-900/40 to-cyan-900/40 backdrop-blur-sm border border-purple-500/30 rounded-full p-4 transition-all duration-300 ${link.color}`}
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 sm:p-8 mb-8"
          >
            <h4 className="text-xl mb-4 text-cyan-300">Book DJ YAN NAING</h4>
            <p className="text-gray-400 mb-4">
              Available for festivals, clubs, and private events worldwide
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+959444008116"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-purple-600 rounded-full hover:from-red-400 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
              >
                Call Now
                <PhoneCall className="w-4 h-4" />
              </a>
              <a
                href="mailto:djyannaing305@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                Email
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <div className="text-gray-500 text-sm space-y-2">
            <p>© 2025 DJ YAN NAING. All rights reserved.</p>
            <p className="flex items-center justify-center gap-2">
              <span>20+ Years of sonic exploration</span>
              <span className="inline-block animate-pulse">✨</span>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
    </footer>
  );
}
