export const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-black py-12 border-t border-black/5 dark:border-white/5 relative z-20 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Left Side */}
          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
            <h4 className="font-bold text-black dark:text-white mb-2">ООО Автошкола «Профи»</h4>
            <p>Лицензия 7167-л</p>
            <p>+7 (999) 123-45-67</p>
          </div>

          {/* Right Side */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <a href="mailto:info@pride.ru" className="hover:text-brand transition-colors">
              info@pride.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
