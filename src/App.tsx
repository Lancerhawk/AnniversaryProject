import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Heart, Sparkles, Stars, PartyPopper, Gift as GiftBox } from 'lucide-react';
import pht1 from '../src/Assets/photo1.jpg';
import pht2 from '../src/Assets/photo2.png';

const FloatingElement = ({ delay = 0, left = "10%", children, duration = 3 }) => (
  <motion.div
    className="absolute"
    style={{ left }}
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [0, -20, 0],
      opacity: [0, 1, 0],
      rotate: [0, 10, -10, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const DecorativeSide = ({ side }: { side: 'left' | 'right' }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  return (
    <motion.div 
      animate={controls}
      className={`absolute top-0 bottom-0 ${side}-0 w-24 hidden lg:flex flex-col justify-between py-12 pointer-events-none`}
    >
      <Stars className={`w-8 h-8 text-rose-400/60 ${side === 'left' ? 'ml-8' : 'mr-8'}`} />
      <Sparkles className={`w-8 h-8 text-rose-400/60 ${side === 'left' ? 'ml-4' : 'mr-4'}`} />
      <Stars className={`w-8 h-8 text-rose-400/60 ${side === 'left' ? 'ml-12' : 'mr-12'}`} />
    </motion.div>
  );
};

const ShimmerEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
      animate={{
        x: ['-100%', '200%']
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 2
      }}
    />
  </div>
);

function App() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowConfetti(prev => !prev);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <FloatingElement key={`heart-${i}`} delay={i * 0.5} left={`${10 + i * 15}%`}>
            <Heart className="w-6 h-6 text-rose-400/60" fill="currentColor" />
          </FloatingElement>
        ))}
        {[...Array(4)].map((_, i) => (
          <FloatingElement key={`sparkle-${i}`} delay={i * 0.7 + 1} left={`${20 + i * 20}%`} duration={4}>
            <Sparkles className="w-5 h-5 text-yellow-400/60" />
          </FloatingElement>
        ))}
        {showConfetti && [...Array(3)].map((_, i) => (
          <FloatingElement key={`party-${i}`} delay={i * 0.3} left={`${30 + i * 20}%`} duration={2}>
            <PartyPopper className="w-6 h-6 text-yellow-500/70" />
          </FloatingElement>
        ))}
      </div>

      {/* Decorative Sides */}
      <DecorativeSide side="left" />
      <DecorativeSide side="right" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl w-full bg-white/80 backdrop-blur-sm p-4 sm:p-8 rounded-2xl shadow-xl relative z-10"
      >
        <ShimmerEffect />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-16 h-16 text-rose-500" fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-rose-300/20 rounded-full blur-xl"
            />
          </div>
        </motion.div>

        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
              <span className="relative">
                Happy Anniversary!<br/>
                <span className='text-2xl'>-Arin & Family</span>
                <motion.div
                  className="absolute -top-6 -right-6"
                  animate={{ rotate: [0, 14, -14, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <GiftBox className="w-8 h-8 text-rose-500" />
                </motion.div>
              </span>
            </h1>
          </motion.div>
          <div className="text-lg sm:text-xl md:text-2xl text-gray-600 h-20">
            <Typewriter
              options={{
                strings: [
                  'Celebrating your beautiful journey together...',
                  'Here\'s to many more years of love and happiness!',
                  'May your love continue to grow stronger each day.',
                  'Wishing you endless joy and laughter!'
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30
              }}
            />
          </div>
        </div>

        <motion.div 
          className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg group"
          >
            <img 
              src={pht1}
              alt="Happy Couple 1"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-rose-500/20 transition-opacity"
            />
            <ShimmerEffect />
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg group"
          >
            <img 
              src={pht2}
              alt="Happy Couple 2"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-rose-500/20 transition-opacity"
            />
            <ShimmerEffect />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center mt-8 relative"
        >
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="absolute left-1/2 -translate-x-1/2 -top-6 w-8 h-8 text-rose-400/60" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-gray-600 italic">
              "The best thing to hold onto in life is each other."
            </p>
            <p className="text-gray-500 text-sm mt-2">- Audrey Hepburn</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;