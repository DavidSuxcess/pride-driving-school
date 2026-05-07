import { Star, ExternalLink, Quote, X } from "lucide-react";
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { useFocusTrap } from "../lib/useFocusTrap";

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
    name: "диана",
    date: "25 марта 2026",
    text: "Всё хорошо",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Пользователь",
    date: "16 марта 2026",
    text: "Ребята действительно занимаются любимым делом! Я наверное самый счастливый ученик автошколы \"Прайд\", мне довелось покататься со всеми инструкторами этой школы. Права у меня были, но и страх к вождению тоже был. Именно поэтому навык был утрачен. Ребята помогли его востановить! Я более уверенно стала чуствовать себя на дороге. Научили меня не боятся, рассказали тонкости поведения на дороге. Показали где мои ошибки, подробно рассказали как их исправить. Занятия проходили в спокойной, дружественной обстановке, что помогало мне не нервничить на дороге.\n\nРЕБЯТА, СПАСИБО ВАМ ОГРОМНОЕ!!!!!\n\nСпасибо Льву за его выдержку и умение понятно обьяснить что, да как!\n\nСпасибо вселяющему в будующего водителя уверенность инструктору Дмитрию!\n\nСпасибо и еще одному инструктору Дмитрию за его поффесионализм и подробные рассказы и разборы моих ошибок!\n\nА так же огромное спасибо инструктору Антону за увлекательное занятие!\nРебята с вами очень легко было работать!\n\nА тем, кто только выбирает для себя инструктора, или автошколу — с уверенностью могу сказать — выбирайте именно \"Прайд\"! Вы не пожалеете. Это именно те инструктора, что учат уверенно ездить, а не занимаются выкачиванием денег.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Маря",
    date: "28 февраля 2026",
    text: "Хочу выразить огромную благодарность лучшему авто инструктору в Красноярске — Льву! Говорю лучшему, потому что есть с кем сравнить, так как брала уроки вождения не у одного инструктора.\nЧеловек действительно НАУЧИЛ меня водить автомобиль практически с нуля! Да, было нелегко, можно сказать, даже очень трудно, но урок за уроком проходил не зря.\nНа каждом занятии узнавала все больше и больше важных тонкостей вождения, про которые др инструкторы никогда не рассказывали.\nЛев не только классный профессиональный инструктор, но и очень добрый, тактичный, терпеливый человек. Умеет сложные вопросы объяснять простым языком, все понятно и подробно рассказать.\nБлагодаря ему я сдала экзамен с первого раза!!! Большое человеческое СПАСИБО вам за это!!!!\nСчитаю, если курсанта будет учить вождению Лев, ему крупно повезло!\nЖелаю вам, Лев Александрович, не смотря на такую нелегкую, стрессовую работу, не растерять те качества характера, которые вы имеете.\nЕще раз огромное спасибо Вам за всё!!!!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Анастасия",
    date: "24 февраля 2026",
    text: "Спасибо большое уважаемым инструкторам Льву и Дмитрию за хорошее и качественное обучение, доступное и понятное объяснение. Ребята очень хорошие, благодарю за помощь в подготовке к экзамену в ГАИ. Права получены))",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Snezhanna Karbivnichaya",
    date: "16 января 2026",
    text: "Инструктор хороший, очень внимательный, уделяет внимание именно проблемам.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "VWVWV",
    date: "13 января 2026",
    text: "Сдал экзамен, спасибо, Лев лучший!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "светлана",
    date: "14 ноября 2025",
    text: "Ураа!!! Я получила права🚘инструктор топ🔥🔥всё чётко и понятно объяснил. Вождение проходило в спокойной и комфортной обстановке, что было важно для меня. Теперь спокойно езжу и не боюсь машин 👍👍",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Пользователь",
    date: "11 ноября 2025",
    text: "Здравствуйте! Я очень благодарна, что пошли на встречу и нашли для меня окошко провести занятие перед экзаменом!🙏🤗 Ощущение легкости и уверенности получила! Дмитрий опытный инструктор, благодаря чему, занятие прошло легко и на доступном языке были разъяснены мои ошибки. Спасибо☺️",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Венера Евгеньевна",
    date: "2 сентября 2025",
    text: "Хороший инструктор, сдала на права, объяснил все так хорошо, что совсем не боюсь ни машин, ни дороги",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "De leone",
    date: "29 июля 2025",
    text: "Все хорошо",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "ирина",
    date: "20 июня 2025",
    text: "Сегодня было первое вождение, всë прошло на лёгкой ноте, инструктор самый спокойны в мире, будет объяснять пока не поймёшь, нет ни кого волнения и стеснения, хочется заниматься каждый день, не выходит из себя когда вы в очередной раз что-то забыли или затупили. Записалась ещё на 3 занятия, в общем всем советую!!!! А самое главное он не сидит в телефоне, всё внимание на вас, кто учился в автошколе тот меня поймёт",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Анна Титова",
    date: "16 июня 2025",
    text: "Инструктор супер, очень грамотный, спокойный, очень комфортно с таким человеком. Занималась уже после получения прав, показал, как себя вести в «реальных условиях», спасибо большое. Всем советую позаниматься и до прав, и после!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "RootTacticalShop",
    date: "23 мая 2025",
    text: "Всем советую данного инструктора, готовился к внутренним и к гаи, все сдал, инструктор очень компетентный вежливый и главное, все понятно объясняет, виден уровень знаний и опыта намного выше чем в «популярных» автошколах",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Лидия Тепло",
    date: "11 апреля 2025",
    text: "Все по делу.\nВождение прошло комфортно, запишусь ещё.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Надежда",
    date: "6 марта 2025",
    text: "Сегодня я сдала на права благодаря Льву!\nХочу рассказать про моего любимого инструктора, который в самом начале нашего занятия сказал: \"Если ты не расслабишься и не начнёшь наслаждаться ездой за рулём у тебя ничего не получится\".\nИ я начала учиться этому расслаблению благодаря таланту моего инструктора стало быстро получаться совмещать сосредоточенность и расслабление.\n\nЛев шаг за шагом объяснял важные правила, которые останутся со мной не только в теории, но и обязательно пригодятся за рулём. Терпеливо по 100 500 раз объяснял одни и те же правила пока не убедился что я их усвоила.\nА ещё Лев обладает колоссальным терпением, потрясающим чувством юмора, тактичностью и умением передать свои занятия, что научиться водить и получить права у вас получится лёгко и радостно.\nБлагодарю тебя, прекрасный человек и мой учитель!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Maxim",
    date: "23 февраля 2025",
    text: "Однозначно рекомендую данного инструктора! Показывает все места, которые по факту могут попасться на экзамене. Лев объясняет всё спокойно и грамотно. В общем и целом 5-ть звёзд и однозначная рекомендация)",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Даша Киреева",
    date: "5 декабря 2024",
    text: "Добрый день! Очень коммуникабельный и пунктуальный Лев Александрович! Открывает мир вождения по новому! Очень доступно объясняет, после занятий с ним становишься уверенной автоледи! Всегда сдерживает субординацию, объясняет доходчиво учит всему что не спросишь например ездить по навигатору, заправляться, зеркала правильно настроить, парковаться! Вообщем где я западала благодаря Льву Александровичу научилась и понимала свои ошибки которые можно под корректировать! Инструктор от бога! Рекомендую на все 100 %",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Влада",
    date: "3 декабря 2024",
    text: "самый лучший и любимый инструктор, спустя год наконец пишу отзыв\nнашла через авито, и это стало самое лучшее случайное знакомство которое могло быть\nвас научат здесь всему, от правильной езды, до реакции в экстренных ситуациях",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Александра",
    date: "30 ноября 2024",
    text: "Профессионал своего дела! Очень понравилось занятие, инструктор все понятно объясняет, с его помощью смогла понять и исправить свои ошибки в вождении. Всем советую!",
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
    text: "Отличный инструктор! Пришла с другой автошколы. Увидел мои ошибки, всё рассказал, показал и нарисовал! Прям советую и знакомым буду советовать сразу его)",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Елизавета",
    date: "3 ноября 2024",
    text: "После двух провальных попыток сдачи экзамена в ГИБДД позанималась со Львом. И сдала экзамен!\nБыла проблема с ориентиром по заезду в гараж, он все досконально объяснил + мы проехали весь маршрут от и до, в каждом закутке он мне объяснял, что и как и главное почему.\nСпасибо большое! Занятия проходят в комфортной, дружелюбной атмосфере. Обязательно рекомендую обращаться за помощью ко Льву!😊",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Пользователь",
    date: "1 ноября 2024",
    text: "Замечательный инструктор, все четко и по делу объясняет. Покатавшись с ним несколько занятий, сдала экзамен с первого раза 👌 Рекомендую 👍🏻👍🏻👍🏻",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Анастасия",
    date: "28 сентября 2024",
    text: "Лев, спасибо вам огромное, сдала с первого раза, вы самый топовый инструктор 👍",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Пользователь удалён",
    date: "20 сентября 2024",
    text: "Все пучком!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Владимир",
    date: "29 июля 2024",
    text: "Лев, рассказал и напомнил обо всех особенностях вождения при сдаче экзамена, все было предельно понятно! Настоящий мастер своего дело! Только огромная благодарность и позитивные впечатления остались после занятия! Еще огромное спасибо!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "$alesman",
    date: "27 июля 2024",
    text: "Прекрасный инструктор Лев! Всё доходчиво, на примерах (иногда с рисунками) объяснял, поддерживал 👍🏻 Каждое занятие проходило очень продуктивно, весело, интересно!\nБлагодаря ему я сдала экзамен в ГИБДД 🎉\nВсем советую обращаться к этому замечательному преподавателю! 🔥",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Степан",
    date: "1 июля 2024",
    text: "Качественно выполненная работа",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Сергей",
    date: "1 июля 2024",
    text: "Рекомендую 👍 Подсказывает лайфхаки про вождении, спокойно и понятно объясняет. Классный инструктор!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Надежда",
    date: "3 июня 2024",
    text: "Терпеливый, тактичный инструктор 🙌🏻😊\nПомог вспомнить навыки вождения, все прошло хорошо 👌🏻",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "laletina",
    date: "14 мая 2024",
    text: "Я не могла сдать на права 2 года и тут натолкнулась на Льва.\nИ сдала!\nЛев действительно профессионал своего дела, расскажет вам лайфхаки, которые не расскажут в автошколе.\n100% рекомендую",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Анна Плахотникова",
    date: "8 мая 2024",
    text: "Брала занятие для отработки маршрута на экзамен. Все четко, по делу. Объяснил каждый перекресток, каждый участок дороги. Все в очень комфортной атмосфере. С уверенностью порекомендую своим знакомым. Спасибо.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Елена Кузьмина",
    date: "7 мая 2024",
    text: "Спасибо за вождение, брала перед внутренним экзаменом и сдала на следующий день, до этого было 2 попытки неудачных",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Лика",
    date: "20 апреля 2024",
    text: "Хотела бы оставить отзыв, брала вождение с 7 утра перед экзаменом, единственный кто согласился со мной покататься в это время. Чему я очень благодарна, все хорошо разъяснил, зарядил на все 100%, благодаря вам и такому заряду настроения без страха села за руль и поехала без сомнения и сдала наконец-то 😄☺️\nСпасибо вам большое 🤗",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Марина",
    date: "20 апреля 2024",
    text: "Спасибо Льву за занятия, помог сдать экзамен в ГАИ, спокойно и доступно объясняет, даёт ценные советы, даже успокоит во время сдачи :))",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Александр Елисеев",
    date: "12 апреля 2024",
    text: "Отличные инструктора, я за два занятия узнал больше чем за всё обучение в автошколе. Всем советую",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Даниил Семенов",
    date: "6 апреля 2024",
    text: "Прекрасный подход к обучению с юмором, поддержкой и харизмой. Спасибо за невероятный опыт в водительском деле!",
    rating: 5,
  },
  {
    name: "Юлия",
    date: "5 апреля 2024",
    text: "Благодаря Льву я с правами! Объясняет доступно и спокойно, что не мало важно. После занятия ты уверен в себе и окрылен, а не в депрессии 😂 спасибо большое за Вашу работу! Рекомендую.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Katerina",
    date: "27 марта 2024",
    text: "Да, всё отлично прошло и занятия с этим инструктором — это ты находишься на лайте всю дорогу, от чего ты спокойно выполняешь все задания, которые будут на экзамене!!))\nКлёвый инструктор Лев, подготовил отлично к экзамену в ГИБДД, сегодня я его сдала с первого раза, всё просто суперски, благодарю тысячекратно 🥳🥳🥳 Самое главное — это спокойствие, оно там есть, ты просто сидишь, рулишь и не чувствуешь даже намёка на то, чтобы что-то пошло не так, Лев всё контролирует, это важно в таком серьёзном деле🤗😇\nНа фото я бегу счастливая домой после экзамена🖤🖤🖤",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Анастасия Буркова",
    date: "15 марта 2024",
    text: "Лев очень хорошо инструктор, взяла два вождения дополнительно, и экзамен в гибдд сдала с первого раза.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Руслан",
    date: "9 марта 2024",
    text: "Отличный инструктор, объясняет все на понятном языке, не ошибся в выборе. После него экзамен в гаи не казался чем-то страшным",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Григорий",
    date: "22 февраля 2024",
    text: "Позитивный человек, помог моему сыну!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Angells.lips",
    date: "5 февраля 2024",
    text: "Замечательный инструктор, всё объясняет понятно, подробно, отработали маршрут и я наконец сдала экзамен! Огромное ему спасибо!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Катерина Шефер",
    date: "1 февраля 2024",
    text: "Классный инструктор! вежливый, позитивный, простой, понятно всё объясняет. Спасибо большое за подготовку к экзамену!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Валентина",
    date: "1 февраля 2024",
    text: "Занятие прошло отлично. Лев — приятный молодой человек. Объясняет очень доступно, делится простыми фишками для лучшего понимания правил.\nБрала занятие перед сдачей внутреннего экзамена в автошколе. Экзамен сдан успешно. Перед сдачей в ГАИ тоже обращусь 👌🏻",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Борис",
    date: "30 января 2024",
    text: "Отличный инструктор нацелен на результат для вас, все расскажет и обговорит ваши ошибки а также поможет их исправить. Всем советую обращаться👍",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Эдуард",
    date: "29 января 2024",
    text: "Отличный инструктор! Объясняет всё очень доходчиво, а главное — спокойно. Занятие проходит в комфортной атмосфере, никакого стресса. 10 из 10! Настоятельно рекомендую!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Лиза Лизина",
    date: "26 января 2024",
    text: "Хороший инструктор, объясняет доходчиво, вежлив, сдала с первого раза",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Никита",
    date: "13 января 2024",
    text: "Отличный инструктор, всегда готов помочь и ответить на любой вопрос. Очень сдержанный и пунктуальный. Отлично подготовил к экзамену в гибдд!!!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Лиза",
    date: "19 декабря 2023",
    text: "Лев очень хороший инструктор! у меня были небольшие проблемы с парковкой, он помог мне разобраться, все спокойно объяснил, занятие проходило максимально комфортно) можно сказать, что за одно занятие информации я получила больше, чем за все уроки вождения в автошколе🤔",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Саня Филимоненко",
    date: "8 декабря 2023",
    text: "Отличный инструктор. Все подробно объяснил, рассказал, показал. По итогу экзамен успешно сдан.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Кристина",
    date: "22 ноября 2023",
    text: "Если вы в поисках хорошего инструктора — тогда вам именно ко Льву. Это лучший, профессионал своего дела, всегда готов придти на помощь. Лев может найти подход к любому курсанту. Всегда подберёт правильные слова, обьяснит вам без лишних нервов ваши пробелы в обучении, поможет исправить ошибки. На все 100 отдаётся своему делу. В любое время готов помочь. Если вы обратились ко Льву — будьте уверены вы попали к профессионалу.",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Яна Грицаюк",
    date: "2 ноября 2023",
    text: "Потрясающий, грамотный и талантливый инструктор🤓 Без криков, агрессии и негатива обьяснит ситуацию на дороге и те ошибки, над которыми нужно работать. Поможет перебороть страх перед реальными дорогами и отработает до идеала все что необходимо при сдаче экзамена.\nЭто потрясающе понимать, когда ты действительно можешь водить и у тебя получается 🤯😱 что бояться это нормально и инструктор именно поэтому и нужен! Заниматься и ездить как будто всегда умел👌🏻🤓\nРекомендую 😌👍🏻",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Наталья",
    date: "27 октября 2023",
    text: "Инструктор, Лев, был внимателен. Подсказал полезные приёмы для учёта габаритов. Отметил мои ошибки. Помог отработать задания как на экзамене. Спасибо большое! РЕКОМЕНДУЮ!",
    rating: 5,
    badge: "Сделка состоялась",
  },
  {
    name: "Дмитрий Максимов",
    date: "1 августа 2023",
    text: "Шикарный инструктор, доступно объясняет с первого раза, приводит примеры из личной жизни, как правильнее поступить в той или иной ситуации. Обращайтесь!",
    rating: 5,
    badge: "Сделка состоялась",
  },
];

const AVITO_URL =
  "https://www.avito.ru/brands/2445e40064cd9cc62a80139e1a006b77/all?gdlkerfdnwq=101&page_from=from_item_card&iid=2858575849&sellerId=1d7fe86f29f3e1325d97cccd2a8cf57d";

// Split reviews for the two scrolling rows
const topRow = reviews.slice(0, 28);
const bottomRow = reviews.slice(28);

const ReviewCard = memo(({ review, onOpen }: { review: Review; onOpen: (r: Review) => void }) => {
  const isLong = review.text.length > 100;
  const shortText = isLong ? review.text.slice(0, 100) + "…" : review.text;

  return (
    <button
      type="button"
      onClick={() => onOpen(review)}
      className="text-left w-[260px] md:w-[360px] h-[180px] md:h-[200px] bg-gray-50 dark:bg-[#121215] rounded-2xl p-5 md:p-6 border border-black/5 dark:border-white/[0.06] flex-shrink-0 flex flex-col gap-3 md:gap-4 hover:border-black/10 dark:hover:border-white/10 transition-colors duration-200 group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <Quote className="absolute top-4 right-4 w-8 h-8 text-brand/10 group-hover:text-brand/20 transition-colors" />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-black dark:text-white text-sm truncate group-hover:text-brand transition-colors">{review.name}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-500">{review.date}</p>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed relative z-10 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
        {shortText}
      </p>

      <div className="flex items-center justify-end mt-auto">
        {isLong && <span className="text-brand text-xs font-medium mr-auto">Читать полностью</span>}
        <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
});

const ScrollRow = ({ items, direction = "left", onOpen }: { items: Review[]; direction?: "left" | "right"; onOpen: (r: Review) => void }) => {
  const extended = [...items, ...items, ...items];
  const animClass = direction === "left" ? "animate-scroll-slow" : "animate-scroll-reverse-slow";

  return (
    <div className="w-full overflow-hidden">
      <div className={`flex gap-4 md:gap-5 ${animClass} w-max hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]`} style={{ willChange: 'transform' }}>
        {extended.map((review, idx) => (
          <ReviewCard key={`${review.name}-${review.date}-${idx}`} review={review} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
};

export const Reviews = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const closePhoto = useCallback(() => setSelectedPhoto(null), []);
  const photoTrapRef = useFocusTrap<HTMLDivElement>(selectedPhoto !== null, closePhoto);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const closeReview = useCallback(() => setSelectedReview(null), []);
  const reviewTrapRef = useFocusTrap<HTMLDivElement>(selectedReview !== null, closeReview);
  const openReview = useCallback((r: Review) => setSelectedReview(r), []);

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
                className="w-[160px] h-[220px] md:w-[240px] md:h-[320px] rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 active:scale-95 md:hover:scale-105 transition-transform duration-200 cursor-zoom-in"
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
          <span className="text-gray-500 text-sm">• 55 отзывов</span>
        </motion.div>

        {/* Scrolling Rows — 2 rows on desktop, 1 on mobile */}
        <div className="space-y-4 md:space-y-5 pb-8">
          <ScrollRow items={topRow} direction="left" onOpen={openReview} />
          <div className="hidden md:block">
            <ScrollRow items={bottomRow} direction="right" onOpen={openReview} />
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
            ref={photoTrapRef}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePhoto}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Фото курсанта"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={closePhoto}
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

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReview}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              ref={reviewTrapRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={`Отзыв от ${selectedReview.name}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto focus:outline-none"
            >
              <button
                onClick={closeReview}
                aria-label="Закрыть"
                className="absolute right-4 top-4 md:right-6 md:top-6 w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>

              <div className="flex items-center gap-4 mb-4 pr-12">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand to-red-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
                  {selectedReview.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-black dark:text-white text-lg truncate">{selectedReview.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{selectedReview.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: selectedReview.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
                {selectedReview.badge && (
                  <span className="ml-3 text-xs font-medium text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                    {selectedReview.badge}
                  </span>
                )}
              </div>

              <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line mb-6">
                {selectedReview.text}
              </p>

              <a
                href={AVITO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-brand hover:underline font-medium"
              >
                Посмотреть на Авито
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
