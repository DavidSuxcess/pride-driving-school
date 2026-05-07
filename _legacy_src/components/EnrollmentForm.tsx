import { useState } from "react";
import { Modal } from "./Modal";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";
import { sendMessageToTelegram, formatEnrollmentMessage } from "../lib/telegram";
import { Loader2 } from "lucide-react";

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentForm = ({ isOpen, onClose }: EnrollmentFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "B" as "A" | "B",
    agreement: false
  });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) return;
    
    setIsSubmitting(true);
    setStatus("idle");

    const message = formatEnrollmentMessage({
      name: formData.name,
      phone: formData.phone,
      category: formData.category
    });

    const success = await sendMessageToTelegram(message);

    setIsSubmitting(false);

    if (success) {
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({
          name: "",
          phone: "",
          category: "B",
          agreement: false
        });
      }, 2000);
    } else {
      setStatus("error");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Запись на курс">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Заявка принята!</h3>
            <p className="text-gray-600 dark:text-gray-400">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="Иван Иванов"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Номер телефона
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="+7 (999) 000-00-00"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Категория прав
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setFormData({ ...formData, category: "A" })}
                  className={`py-3 rounded-xl border font-bold transition-all ${
                    formData.category === "A"
                      ? "bg-brand border-brand text-white"
                      : "bg-transparent border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-black/30 dark:hover:border-white/30"
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Категория A
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setFormData({ ...formData, category: "B" })}
                  className={`py-3 rounded-xl border font-bold transition-all ${
                    formData.category === "B"
                      ? "bg-brand border-brand text-white"
                      : "bg-transparent border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-black/30 dark:hover:border-white/30"
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Категория B
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="agreement"
                  required
                  checked={formData.agreement}
                  onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                  disabled={isSubmitting}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 checked:border-brand checked:bg-brand transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <label htmlFor="agreement" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                Я согласен с условиями обработки персональных данных и{" "}
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="text-brand hover:underline"
                >
                  политикой конфиденциальности
                </button>
              </label>
            </div>

            {status === "error" && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-brand font-bold text-white text-lg hover:bg-orange-600 transition-colors shadow-[0_0_20px_rgba(228,84,0,0.3)] hover:shadow-[0_0_30px_rgba(228,84,0,0.5)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </button>
          </form>
        )}
      </Modal>

      <PrivacyPolicyModal 
        isOpen={showPrivacy} 
        onClose={() => setShowPrivacy(false)} 
      />
    </>
  );
};
