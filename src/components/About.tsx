import React from 'react';
import { motion } from 'motion/react';
import { Orbit, Heart, Map, Disc } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

export function About() {
  return (
    <section id="legacy" className="relative py-20 sm:py-32 snap-start snap-always">
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
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full" />
                <Orbit 
                  className="w-12 h-12 text-white relative animate-spin" 
                  style={{ 
                    animationDuration: '8s',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
                  }} 
                />
              </div>
            </motion.div>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl mb-6 text-white"
              style={{ 
                fontFamily: '"DM Serif Text", serif',
                textShadow: '0 8px 24px rgba(0, 0, 0, 0.7), 0 16px 48px rgba(0, 0, 0, 0.5)',
              }}
            >
              The Legacy
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 sm:p-8"
          >
            <Tabs defaultValue="life" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-purple-500/30 h-auto p-1">
                <TabsTrigger 
                  value="life" 
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:border-red-500/50 data-[state=active]:text-white flex items-center gap-2 py-3"
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">The Life</span>
                  <span className="sm:hidden">Life</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="journey"
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:border-cyan-500/50 data-[state=active]:text-white flex items-center gap-2 py-3"
                >
                  <Map className="w-4 h-4" />
                  <span className="hidden sm:inline">The Journey</span>
                  <span className="sm:hidden">Journey</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="craft"
                  className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:border-pink-500/50 data-[state=active]:text-white flex items-center gap-2 py-3"
                >
                  <Disc className="w-4 h-4" />
                  <span className="hidden sm:inline">The Craft</span>
                  <span className="sm:hidden">Craft</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="life" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="overflow-hidden rounded-2xl border border-red-500/30">
                    <img
                      src="https://i.postimg.cc/2SjR6zgy/IMG-2269-1.jpg"
                      alt="DJ set capturing the life of DJ Yan Naing"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 text-red-300">The Life</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Born and raised in Mandalay, Myanmar, his musical story began in 2005 when he first stepped behind the decks in the city's club scene. What started as passion quickly evolved into a full-fledged career, marking the beginning of one of Mandalay's longest-standing figures in electronic music. From his early days, he became known for connecting deeply with the crowd — a skill that defined his sets and shaped his identity as both a performer and mentor.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="journey" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="overflow-hidden rounded-2xl border border-cyan-500/30">
                    <img
                      src="https://i.postimg.cc/XYNSJVty/IMG-4898.jpg"
                      alt="DJ Yan Naing performing during a milestone in his journey"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <Map className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                    <h3 className="text-xl sm:text-2xl text-cyan-300">The Journey</h3>
                  </div>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      From <span className="text-cyan-400">2005 to 2009</span>, he served as the resident DJ at M-Bar, Mandalay Hill Resort Hotel, where he built his reputation among local audiences and became a familiar name at Mandalay Thingyan Festivals every year.
                    </p>
                    <p>
                      In <span className="text-cyan-400">2013</span>, he joined Barcode Club for a year, expanding his sound and network.
                    </p>
                    <p>
                      By <span className="text-cyan-400">2016</span>, he took the stage at Electric Dream Festival, performing alongside international artists such as Ummet Ozcan, Jetfire, Danny Avila, and Soda.
                    </p>
                    <p>
                      In <span className="text-cyan-400">2017</span>, he played at The Rave Music Festival (Mandalay) with Garmiani, Debris, and Vida, and at the Electronic Dream Festival, sharing the stage with Curbi, D'Angello & Francis, and Mesto.
                    </p>
                    <p>
                      From <span className="text-cyan-400">2017 to 2020</span>, he worked as Music Director at Brave Bar Mandalay, managing both international artist bookings and event lineups for acts including Mark Sixma, Metroda, Jewelz & Sparks, Skelism, Ben Gold, and Maddix.
                    </p>
                    <p>
                      In <span className="text-cyan-400">April 2018</span>, he joined the Infinity Indoor Trance Festival, sharing the stage with Aly & Fila, Lucas & Steve, Genix, and Mark Sherry, receiving massive support from Myanmar's growing trance community.
                    </p>
                    <p>
                      Later that year, he performed at DLDK Festival Yangon with Dimitri Vegas & Like Mike, Mike Williams, Blasterjaxx, Senvox, and Olly James.
                    </p>
                    <p>
                      His international appearances continued at <span className="text-cyan-400">Waterzonic Bangkok 2019</span>, performing with Excision, Nicky Romero, and Yultron, followed by The Mandalay Countdown Festival (TMC) where he shared the stage with Wolfpack, Run D, AVAO, and Curbi.
                    </p>
                    <p>
                      In <span className="text-cyan-400">2023</span>, he returned to the stage at the Myanmar Thingyan Music Festival, performing alongside Vini Vici.
                    </p>
                    <p>
                      Since <span className="text-cyan-400">2007</span>, he has also been a dedicated DJ instructor, training and mentoring numerous students up to the present day. Between 2023 and 2025, he has continued to work as a music director, concept developer, and event planner for bars, parties, and large-scale festivals.
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="craft" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="overflow-hidden rounded-2xl border border-pink-500/30">
                    <img
                      src="https://i.postimg.cc/bwYcJz4S/1G3A8959-copy.jpg"
                      alt="DJ Yan Naing refining his craft behind the decks"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <Disc className="w-6 h-6 text-pink-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 text-pink-300">The Craft</h3>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          His musical style blends <span className="text-pink-400">Trance</span>, <span className="text-pink-400">Progressive Trance</span>, and <span className="text-pink-400">Melodic House/Tech</span>, weaving emotional melodies with driving energy that takes audiences on an immersive journey. Whether performing in intimate clubs or massive festivals, his sets are defined by precision, emotion, and flow — a reflection of nearly two decades of experience behind the decks.
                        </p>
                        <p>
                          To him, music is more than entertainment — it's a story, a connection, and a legacy that continues to inspire the next generation of Myanmar's electronic music scene.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
