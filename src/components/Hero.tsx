
import { motion } from "framer-motion";

interface HeroProps {
  onOpenEnrollment: () => void;
}

export const Hero = ({ onOpenEnrollment }: HeroProps) => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-white dark:bg-[#050505] text-black dark:text-white overflow-hidden transition-colors duration-300">
      {/* Dot Pattern Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(circle,#000000_1px,transparent_1px)] dark:bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Large Lion Background (Right Side) */}
      <div className="absolute right-[-20%] md:right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1400px] md:h-[1400px] opacity-100 pointer-events-none select-none z-0">
        <motion.img 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          src="images/logo.svg"
          alt="Lion Background"
          decoding="async"
          className="w-full h-full object-contain opacity-20 md:opacity-40 will-change-transform"
          style={{
            maskImage: 'linear-gradient(to left, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 100%)'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-start justify-center h-full pt-20">
        
        {/* Main Text Content */}
        <div className="flex flex-col items-start max-w-4xl">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-6xl font-bold text-brand tracking-wide"
          >
            Школа вождения
          </motion.h2>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-[8rem] font-russo leading-none uppercase tracking-wider text-black dark:text-white mt-4 md:mt-8 drop-shadow-2xl will-change-transform"
          >
            ПРАЙД
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-[1.99rem] font-bold text-gray-900 dark:text-white/90 mt-6 tracking-wide max-w-xl md:max-w-none"
          >
            Мастерство начинается здесь!
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onClick={onOpenEnrollment}
          className="mt-8 md:mt-12 group relative px-8 py-4 md:px-10 md:py-5 bg-brand rounded-full font-bold text-base md:text-xl text-white overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(228,84,0,0.4)]"
        >
          <span className="relative z-10">Записаться на курс</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>

      </div>
      {/* Bottom Gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-96 bg-gradient-to-b from-transparent to-white dark:to-black z-[5] pointer-events-none" />
    </section>
  );
};
