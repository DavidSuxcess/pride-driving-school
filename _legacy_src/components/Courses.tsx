import { Check } from "lucide-react";
import { motion } from "framer-motion";

const featuresBasic = [
  "42 часа на автомат",
  "44 часа на механику"
];

const featuresPremium = [
  "54 часа на автомат",
  "56 часов на механику",
  "Бесплатный внутренний экзамен",
  "Неограниченное число занятий",
  "Индивидуальный график",
  "Забираем из дома",
  "Все походы на экзамен бесплатны (внутренний, ГИБДД, вождение + теория)",
  "Сопровождение на всех этапах"
];

const featuresVIP = [
  "Неограниченное число занятий",
  "Индивидуальный график",
  "Забираем из дома",
  "Все походы на экзамен бесплатны (внутренний, ГИБДД, вождение + теория)",
  "Сопровождение на всех этапах",
  "Автомобиль премиум-класса"
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

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {/* Basic Course — самый сдержанный */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl bg-gray-50 dark:bg-[#0B0B0D] p-6 md:p-7 flex flex-col border border-black/5 dark:border-white/5 transition-colors will-change-transform opacity-95"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Базовый</h3>
              <p className="text-gray-500 dark:text-gray-500 text-sm">Идеальный старт для уверенного вождения</p>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-700 dark:text-gray-300">50 000 ₽</span>
              <span className="text-gray-500 ml-2 text-base">/ курс</span>
            </div>

            <ul className="space-y-4 mb-6 flex-grow">
              {featuresBasic.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="w-3 h-3 text-black/40 dark:text-white/40" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Premium Course — средний акцент */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-3xl bg-gray-100 dark:bg-[#0F0F11] p-6 md:p-8 flex flex-col border border-brand/60 shadow-[0_0_30px_rgba(228,84,0,0.15)] relative will-change-transform"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Премиум</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Расширенная программа с поддержкой на каждом этапе</p>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold text-brand">65 000 ₽</span>
              <span className="text-gray-500 ml-2 text-lg">/ курс</span>
            </div>

            <ul className="space-y-5 mb-8 flex-grow">
              {featuresPremium.map((feature) => (
                <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-brand" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* VIP Course — главный акцент */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-3xl bg-gradient-to-br from-[#1a1410] via-gray-900 to-black p-7 md:p-10 flex flex-col border-2 border-yellow-500/70 shadow-[0_0_80px_rgba(234,179,8,0.4)] relative will-change-transform md:scale-[1.04] md:-my-2 z-10"
          >
            {/* Внешний золотой ореол */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-yellow-400/30 via-transparent to-yellow-600/20 pointer-events-none" />

            <div className="relative mb-8 mt-2">
              <h3 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">VIP</h3>
              <p className="text-gray-300 text-sm">Максимальный комфорт и гарантия результата</p>
            </div>

            <div className="relative mb-8">
              <span className="text-6xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">110 000 ₽</span>
              <span className="text-gray-400 ml-2 text-lg">/ курс</span>
            </div>

            <ul className="relative space-y-5 mb-8 flex-grow">
              {featuresVIP.map((feature) => (
                <li key={feature} className="flex items-center text-gray-200 font-medium">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/25 ring-1 ring-yellow-500/40 flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-yellow-400" />
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
