import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Camera } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay@8.6.0';

export function GalaxyCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const galaxyImages = [
    {
      url: 'https://i.postimg.cc/rwtrbkF1/7AF26E6B-5BF6-4DAA-8722-623D03AC4277.jpg',
      alt: 'DJ Yan Naing performing with vivid lighting and crowd energy',
    },
    {
      url: 'https://i.postimg.cc/y8SZ5HYM/IMG-0487.jpg',
      alt: 'Close-up shot of DJ Yan Naing at the decks',
    },
    {
      url: 'https://i.postimg.cc/t4VxfjCc/IMG-0911.jpg',
      alt: 'Festival stage with laser lights during DJ Yan Naing set',
    },
    {
      url: 'https://i.postimg.cc/13NqTQ3x/IMG-1206.jpg',
      alt: 'DJ booth view with Yan Naing performing to the audience',
    },
    {
      url: 'https://i.postimg.cc/T3WDS636/IMG-1208.jpg',
      alt: 'Atmospheric lighting over the crowd at a Yan Naing show',
    },
    {
      url: 'https://i.postimg.cc/3xDv6TxY/IMG-1212.jpg',
      alt: 'Wide angle photo capturing the full festival stage production',
    },
    {
      url: 'https://i.postimg.cc/pLnF7HX6/IMG-2266.jpg',
      alt: 'Yan Naing engaging with the audience during a set',
    },
    {
      url: 'https://i.postimg.cc/fR09FNTg/IMG-2269.jpg',
      alt: 'Dynamic performance moment with vibrant stage lighting',
    },
    {
      url: 'https://i.postimg.cc/FHJLq4sP/IMG-4492.jpg',
      alt: 'Nighttime festival crowd with immersive visuals',
    },
    {
      url: 'https://i.postimg.cc/T3WDS6Yq/IMG-4898.jpg',
      alt: 'Yan Naing performing on a large LED-backed stage',
    },
    {
      url: 'https://i.postimg.cc/KvWTJzFp/IMG-5584.jpg',
      alt: 'DJ Yan Naing silhouetted against colorful lights',
    },
    {
      url: 'https://i.postimg.cc/15dFJtPC/IMG-9811.jpg',
      alt: 'Hands-in-the-air crowd moment during a Yan Naing performance',
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden snap-start snap-always">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
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
                <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full" />
                <Camera className="w-12 h-12 text-cyan-400 relative" />
              </div>
            </motion.div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl mb-4 text-white"
              style={{ fontFamily: '"DM Serif Text", serif' }}
            >
              Memory of Events
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Relive signature sets and unforgettable festival moments.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="px-12"
          >
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[plugin.current]}
              className="w-full"
            >
              <CarouselContent>
                {galaxyImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                    >
                      <ImageWithFallback
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-all duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm sm:text-base">{image.alt}</p>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-purple-600/80 hover:bg-purple-500 border-purple-500/30 text-white -left-4 sm:-left-6" />
              <CarouselNext className="bg-purple-600/80 hover:bg-purple-500 border-purple-500/30 text-white -right-4 sm:-right-6" />
            </Carousel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
