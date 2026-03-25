import { Star, ExternalLink, Quote, X } from "lucide-react";
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Review {
  name: string;
  date: string;
  text: string;
  rating: number;
  badge?: string;
}

const studentPhotos = [
  `${import.meta.env.BASE_URL}images/student_1.jpg`,
  `${import.meta.env.BASE_URL}images/student_2.jpg`,
  `${import.meta.env.BASE_URL}images/student_3.jpg`,
  `${import.meta.env.BASE_URL}images/student_4.jpg`,
  `${import.meta.env.BASE_URL}images/student_5.jpg`,
];
const extendedPhotos = [...studentPhotos, ...studentPhotos, ...studentPhotos];

const reviews: Review[] = [
  {
    name: "Даша Киреева",
    date: "5 декабря 2024",
    text: "Очень коммуникабельный и пунктуальный Лев Александрович! Открывает мир вождения по-новому. Научил всему: ездить по навигатору, заправляться, зеркала правильно настроить, парковаться!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Влада",
    date: "3 декабря 2024",
    text: "Самый лучший и любимый инструктор! Нашла через Авито. Научат здесь всему: от правильной езды до реакции в экстренных ситуациях.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Александра",
    date: "30 ноября 2024",
    text: "Профессионал своего дела! Инструктор все понятно объясняет, с его помощью смогла понять и исправить свои ошибки в вождении.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Екатерина Сергеевна",
    date: "7 ноября 2024",
    text: "Жаль, что Вы мне не попались раньше, молодой, знающий своё дело инструктор 💪",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Вера",
    date: "5 ноября 2024",
    text: "Отличный инструктор! Пришла из другой автошколы. Увидел мои ошибки, всё рассказал, показал и нарисовал!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Елизавета",
    date: "3 ноября 2024",
    text: "После двух провальных попыток сдачи экзамена в ГИБДД позанималась со Львом. И сдала экзамен! Занятия проходят в комфортной, дружелюбной атмосфере.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "De leone",
    date: "29 июля 2025",
    text: "Хороший инструктор, сдала на права, объяснил все так хорошо, что совсем не боюсь ни машин, ни дороги.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Ирина",
    date: "20 июня 2025",
    text: "Всё прошло на лёгкой ноте, инструктор самый спокойный в мире. Рекомендую всем!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Анна Титова",
    date: "16 июня 2025",
    text: "Инструктор супер, очень грамотный, спокойный, очень комфортно с таким человеком.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "RootTacticalShop",
    date: "23 мая 2025",
    text: "Всем советую данного инструктора, готовился к внутренним и к ГАИ, все сдал.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Пользователь",
    date: "16 марта 2025",
    text: "Ребята действительно занимаются любимым делом! Учит именно водить и чувствовать машину, а не просто заучивать маршруты.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Маря",
    date: "28 февраля 2025",
    text: "Хочу выразить огромную благодарность лучшему авто инструктору в Красноярске — Льву!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Анастасия",
    date: "24 февраля 2025",
    text: "Спасибо большое уважаемым инструкторам Льву и Дмитрию за хорошее и качественное обучение, доступное и понятное объяснение. Ребята очень хорошие, благодарю за помощь в подготовке к экзамену в ГАИ. Права получены))",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Snezhanna",
    date: "16 января 2025",
    text: "Инструктор хороший, очень внимательный, уделяет внимание именно проблемам.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "VWVWV",
    date: "13 января 2025",
    text: "Сдал экзамен, спасибо, Лев лучший!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "светлана",
    date: "14 ноября 2024",
    text: "Ураа!!! Я получила права🚘инструктор топ🔥🔥всё чётко и понятно объяснил. Вождение проходило в спокойной и комфортной обстановке, что было важно для меня. Теперь спокойно езжу и не боюсь машин 👍👍",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Венера Евгеньевна",
    date: "2 сентября 2024",
    text: "Хороший инструктор ,сдала на права , объяснил все так хорошо ,что совсем не боюсь ни машин ,ни дороги",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Лидия Тепло",
    date: "11 апреля 2024",
    text: "Все по делу. Вождение прошло комфортно, запишусь ещё.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Надежда",
    date: "6 марта 2024",
    text: "Сегодня я сдала на права благодаря Льву! Хочу рассказать про моего любимого инструктора, который в самом начале нашего занятия сказал: \"Если ты не расслабишься и не начнёшь наслаждаться ездой за рулём у тебя ничего не получится\". И я начала учиться этому расслаблению благодаря таланту моего инструктора стало быстро получаться совмещать сосредоточенность и расслабление. Лев шаг за шагом объяснял важные правила, которые останутся со мной не только в теории, но и обязательно пригодятся за рулём. Терпеливо по 100 500 раз объяснял одни и те же правила пока не убедился что я их усвоила. А ещё Лев обладает колоссальным терпением, потрясающим чувством юмора, тактичностью и умением передать свои занятия, что научиться водить и получить права у вас получится лёгко и радостно. Благодарю тебя, прекрасный человек и мой учитель!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Maxim",
    date: "23 февраля 2024",
    text: "Все доступно и понятно, Лев отличный инструктор, подскажет где ошибки и как их исправить, всем рекомендую.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Анастасия",
    date: "28 сентября 2023",
    text: "Лев , спасибо вам огромное , сдала с первого раза , вы самый топовый инструктор 👍",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Пользователь удалён",
    date: "20 сентября 2023",
    text: "Все пучком!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Владимир",
    date: "29 июля 2023",
    text: "Лев, рассказал и напомнил обо всех особенностях вождения при сдаче экзамена,все было предельно понятно! Настоящий мастер своего дело! Только огромная благодарность и позитивные впечатления остались после занятия! Еще огромное спасибо!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "$alesman",
    date: "27 июля 2023",
    text: "Прекрасный инструктор Лев! Всё доходчиво, на примерах (иногда с рисунками) объяснял, поддерживал 👍🏻 Каждое занятие проходило очень продуктивно, весело, интересно! Благодаря ему я сдала экзамен в ГИБДД 🎉 Всем советую обращаться к этому замечательному преподавателю! 🔥",
    rating: 5,
    badge: "Сделка состоялась",
  },
];

const AVITO_URL =
  "https://www.avito.ru/brands/2445e40064cd9cc62a80139e1a006b77/all?gdlkerfdnwq=101&page_from=from_item_card&iid=2858575849&sellerId=1d7fe86f29f3e1325d97cccd2a8cf57d";

// Split reviews for the two scrolling rows
const topRow = reviews.slice(0, 12);
const bottomRow = reviews.slice(12, 24);

const ReviewCard = memo(({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortText = review.text.length > 100 ? review.text.slice(0, 100) + "..." : review.text;

  return (
    <a
      href={AVITO_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'flex' }}
      className="min-w-[260px] md:min-w-[360px] bg-gray-50 dark:bg-[#121215] rounded-2xl p-5 md:p-6 border border-black/5 dark:border-white/[0.06] flex-shrink-0 flex-col gap-3 md:gap-4 hover:border-black/10 dark:hover:border-white/10 transition-colors duration-200 group relative overflow-hidden"
    >
      {/* Decorative quote */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-brand/10 group-hover:text-brand/20 transition-colors" />

      {/* Header: Name + Date */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-black dark:text-white text-sm truncate group-hover:text-brand transition-colors">{review.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-500">{review.date}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1 relative z-10">
        {isExpanded ? review.text : shortText}
        {review.text.length > 100 && (
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevent navigating when just expanding text
              setIsExpanded(!isExpanded);
            }}
            className="text-brand hover:underline ml-1 text-xs font-medium relative z-20"
          >
            {isExpanded ? "Свернуть" : "Читать далее"}
          </button>
        )}
      </p>

      {/* Link Icon */}
      <div className="flex items-center justify-end mt-auto">
        <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
  );
});

const ScrollRow = ({ items, direction = "left" }: { items: Review[]; direction?: "left" | "right" }) => {
  const extended = [...items, ...items, ...items];
  const animClass = direction === "left" ? "animate-scroll-slow" : "animate-scroll-reverse-slow";

  return (
    <div className="w-full overflow-hidden">
      <div className={`flex gap-4 md:gap-5 ${animClass} w-max hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]`} style={{ willChange: 'transform' }}>
        {extended.map((review, idx) => (
          <ReviewCard key={`${review.name}-${review.date}-${idx}`} review={review} />
        ))}
      </div>
    </div>
  );
};

export const Reviews = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section
      id="reviews"
      className="relative w-full py-24 bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300"
    >
      {/* Top Gradient for smooth transition */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white dark:from-black to-transparent z-[5] pointer-events-none" />

      <div className="relative z-10">
        
        {/* Original Auto-scrolling Carousel - Full Width */}
        <div className="container mx-auto px-4 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white"
          >
            Наши курсанты
          </motion.h2>
        </div>

        <div className="w-full overflow-hidden pb-8">
          <div className="flex gap-4 md:gap-6 animate-scroll w-max hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]" style={{ willChange: 'transform' }}>
            {extendedPhotos.map((src, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(src)}
                className="min-w-[160px] h-[220px] md:min-w-[240px] md:h-[320px] rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 active:scale-95 md:hover:scale-105 transition-transform duration-200 cursor-zoom-in"
              >
                <img src={src} alt="Курсант" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        {/* Header for Reviews */}
        <div className="container mx-auto px-4 mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white"
          >
            Отзывы
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-gray-500 dark:text-gray-500 mt-3 text-sm md:text-base"
          >
            Реальные отзывы наших учеников на Авито
          </motion.p>
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          <span className="text-2xl font-bold text-black dark:text-white">5.0</span>
          <span className="text-gray-500 text-sm">• 54+ отзыва</span>
        </motion.div>

        {/* Scrolling Rows — 2 rows on desktop, 1 on mobile */}
        <div className="space-y-4 md:space-y-5 pb-8">
          <ScrollRow items={topRow} direction="left" />
          <div className="hidden md:block">
            <ScrollRow items={bottomRow} direction="right" />
          </div>
        </div>

        {/* Avito CTA Block */}
        <div className="container mx-auto px-4 mt-8">
          <div className="max-w-4xl mx-auto">
            <motion.a
              href={AVITO_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-[120px] md:h-[160px] rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-[#00b4fc] to-[#007cf0] flex items-center justify-center gap-3 shadow-[0_0_100px_rgba(0,180,252,0.15)] relative overflow-hidden group cursor-pointer hover:shadow-[0_0_120px_rgba(0,180,252,0.3)] transition-all duration-500"
            >
              {/* Glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/10 blur-[30px] md:blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="text-2xl md:text-4xl font-bold text-white relative z-10">
                Все отзывы на Авито
              </h3>
              <ExternalLink className="w-6 h-6 md:w-8 md:h-8 text-white/80 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-b from-transparent to-white dark:to-black z-[5] pointer-events-none" />

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label="Фото курсанта"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedPhoto(null)}
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
              src={selectedPhoto}
              alt="Курсант"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
