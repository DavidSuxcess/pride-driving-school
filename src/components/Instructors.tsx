import { useState } from "react";
import { User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const instructors = [
  {
    name: "Лев",
    title: "Старший инструктор",
    image: `${import.meta.env.BASE_URL}images/instructor_lev.jpg`,
    description: [
      "• Стаж вождения: 17 лет, стаж преподавания: более 7 лет.",
      "• Использую знания психологии для индивидуального подхода к каждому ученику.",
      "• Помогаю преодолеть страхи, выявить слабые стороны и превратить их в преимущества.",
      "• Обучаю не только правилам, но и свободному, уверенному вождению."
    ],
    gradient: "from-orange-500 to-red-600"
  },
  {
    name: "Дмитрий Андреевич Белоногов",
    title: "Инструктор",
    image: `${import.meta.env.BASE_URL}images/instructor_dmitry_b.jpg`,
    description: [
      "• Стаж вождения: 10 лет.",
      "• Внимательный и обстоятельный подход к каждому занятию.",
      "• Главные принципы: терпение, ответственность и стрессоустойчивость.",
      "• Учу сохранять спокойствие при сложных манёврах и в плотном городском потоке."
    ],
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    name: "Дмитрий",
    title: "Инструктор МКПП / АКПП",
    image: `${import.meta.env.BASE_URL}images/instructor_dmitry.jpg`,
    description: [
      "• Обучаю на МКПП («механика») и АКПП («автомат»).",
      "• Выстраиваю индивидуальную программу: отрабатываем сложные маршруты и уверенную езду.",
      "• Объясняю всё чётко, без стресса и криков — создаю безопасную атмосферу.",
      "• Учу не для галочки в ГАИ, а для уверенной и безопасной жизни за рулём."
    ],
    gradient: "from-purple-500 to-pink-600"
  }
];

export const Instructors = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <section id="instructors" className="relative w-full py-16 md:py-24 bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">
      {/* Top Gradient for smooth transition */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white dark:from-black to-transparent z-[5] pointer-events-none" />

      {/* Background Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-900/10 blur-[30px] md:blur-[60px] pointer-events-none" />
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[40px] md:blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[40px] md:blur-[80px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-24 text-black dark:text-white"
        >
          Наши инструкторы
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {instructors.map((inst, idx) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-gray-100 dark:bg-[#121212] rounded-[2rem] p-6 pt-0 md:p-8 md:pt-0 relative border border-black/5 dark:border-white/5 flex flex-col items-center mt-12 md:mt-16 hover:border-black/10 dark:hover:border-white/10 transition-colors will-change-transform h-full"
            >
              {/* Avatar - Negative margin to pop out */}
              <div 
                className={`w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br ${inst.gradient} flex items-center justify-center -mt-16 md:-mt-24 mb-6 md:mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden shrink-0 border-4 border-white dark:border-[#121212] ${inst.image ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                onClick={() => inst.image && setSelectedImage(inst.image)}
              >
                {inst.image && !imgErrors[inst.name] ? (
                  <img
                    src={inst.image}
                    alt={inst.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgErrors(prev => ({ ...prev, [inst.name]: true }))}
                  />
                ) : (
                  <User className="w-12 h-12 md:w-20 md:h-20 text-white" />
                )}
              </div>

              <div className="text-center w-full flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-2">{inst.name}</h3>
                <p className="text-brand text-xs md:text-sm font-medium mb-4 uppercase tracking-wide">{inst.title}</p>
                <div className="w-full h-px bg-black/5 dark:bg-white/5 mb-6 shrink-0" />
                
                {/* Description paragraphs */}
                <div className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300 space-y-3 pb-4">
                  {inst.description.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed whitespace-pre-line">{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Bottom Gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-64 md:h-96 bg-gradient-to-b from-transparent to-white dark:to-black z-[5] pointer-events-none" />

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label="Фото инструктора"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Instructor"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
