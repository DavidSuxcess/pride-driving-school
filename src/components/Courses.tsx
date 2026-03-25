import { Check } from "lucide-react";
import { motion } from "framer-motion";

const featuresBasic = [
  "Теория онлайн или в классе",
  "Практика: 54/56 часов",
  "Сопровождение в ГИБДД",
  "ГСМ включен",
  "Выбор инструктора"
];

const featuresVIP = [
  "Всё, что в Базовом",
  "Индивидуальный график",
  "Автомобиль премиум-класса",
  "Занятия в любое время",
  "Персональный менеджер",
  "Доп. часы вождения"
];

export const Courses = () => {
  return (
    <section id="courses" className="relative w-full pt-20 pb-32 bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">
      {/* Top Gradient for smooth transition from Hero */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-black to-transparent z-[5] pointer-events-none" />

      {/* Background Blurs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[40px] md:blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[40px] md:blur-[80px] pointer-events-none" />
      {/* Bottom transition blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-brand/5 blur-[30px] md:blur-[60px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 text-black dark:text-white"
        >
          Курсы
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Basic Course */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-gray-100 dark:bg-[#0F0F11] p-6 md:p-10 flex flex-col border border-black/10 dark:border-white/10 shadow-lg hover:border-black/20 dark:hover:border-white/20 transition-colors will-change-transform"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Базовый</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Идеальный старт для уверенного вождения</p>
            </div>
            
            <div className="mb-8">
              <span className="text-5xl font-bold text-black dark:text-white">35 000 ₽</span>
              <span className="text-gray-500 ml-2 text-lg">/ курс</span>
            </div>

            <ul className="space-y-5 mb-8 flex-grow">
              {featuresBasic.map((feature) => (
                <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-black/50 dark:text-white/50" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* VIP Course */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl bg-gray-100 dark:bg-[#0F0F11] p-6 md:p-10 flex flex-col border border-brand shadow-[0_0_50px_rgba(228,84,0,0.3)] relative will-change-transform"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">VIP</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Максимальный комфорт и гарантия результата</p>
            </div>
            
            <div className="mb-8">
              <span className="text-5xl font-bold text-brand">55 000 ₽</span>
              <span className="text-gray-500 ml-2 text-lg">/ курс</span>
            </div>

            <ul className="space-y-5 mb-8 flex-grow">
              {featuresVIP.map((feature) => (
                <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-brand" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      {/* Bottom Gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-b from-transparent to-white dark:to-black z-[5] pointer-events-none" />
    </section>
  );
};
