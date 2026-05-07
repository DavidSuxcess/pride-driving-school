export const sendMessageToTelegram = async (message: string): Promise<boolean> => {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram credentials are missing");
    return false;
  }

  try {
    // Send the main text message with Inline Keyboard
    const messageUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const messageResponse = await fetch(messageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⏳ Не звонили", callback_data: "status_not_called" }
            ]
          ]
        }
      }),
    });

    return messageResponse.ok;
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return false;
  }
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;');

export const formatEnrollmentMessage = (data: {
  name: string;
  phone: string;
  category: string;
}) => {
  const cleanPhone = data.phone.replace(/[^\d+]/g, '');
  const name = escapeHtml(data.name);
  const phone = escapeHtml(data.phone);
  const category = escapeHtml(data.category);

  return `
<b>🔥 Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${name}
📱 <b>Телефон:</b> <a href="tel:${cleanPhone}">${phone}</a>
🚗 <b>Категория:</b> ${category}

<i>Пожалуйста, свяжитесь с клиентом как можно скорее.</i>
`;
};
