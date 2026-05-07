import { Modal } from "./Modal";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Политика конфиденциальности">
      <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
        <p>
          Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности) действует в отношении всей информации, которую сайт автошколы «Прайд», расположенный на доменном имени pride-driving.ru, может получить о Пользователе во время использования сайта, программ и продуктов сайта.
        </p>
        
        <h4 className="font-bold text-black dark:text-white text-base mt-4">1. ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</h4>
        <p>
          1.1 В настоящей Политике конфиденциальности используются следующие термины:
          <br/>
          1.1.1. «Администрация сайта» – уполномоченные сотрудники на управление сайтом, действующие от имени автошколы «Прайд», которые организуют и (или) осуществляют обработку персональных данных.
        </p>

        <h4 className="font-bold text-black dark:text-white text-base mt-4">2. ПРЕДМЕТ ПОЛИТИКИ КОНФИДЕНЦИАЛЬНОСТИ</h4>
        <p>
          2.1. Настоящая Политика конфиденциальности устанавливает обязательства Администрации сайта по неразглашению и обеспечению режима защиты конфиденциальности персональных данных, которые Пользователь предоставляет по запросу Администрации сайта при регистрации на сайте или при оформлении заявки на обучение.
        </p>
        
        <h4 className="font-bold text-black dark:text-white text-base mt-4">3. ЦЕЛИ СБОРА ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ</h4>
        <p>
          3.1. Персональные данные Пользователя Администрация сайта может использовать в целях:
          <br/>
          3.1.1. Идентификации Пользователя, зарегистрированного на сайте.
          <br/>
          3.1.2. Установления с Пользователем обратной связи, включая направление уведомлений, запросов.
        </p>

        <div className="pt-6">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-brand font-bold text-white hover:bg-orange-600 transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </Modal>
  );
};
