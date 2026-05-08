import dotenv from 'dotenv';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const token = process.env.VITE_TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('Error: VITE_TELEGRAM_BOT_TOKEN is missing in .env file');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log('Bot is running and waiting for interactions...');

// Handle callback queries
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;

  let newKeyboard;

  // Toggle status logic
  if (data === 'status_not_called') {
    newKeyboard = [[{ text: '✅ Позвонили', callback_data: 'status_called' }]];
    
    // Edit the keyboard to show "Called" state
    bot.editMessageReplyMarkup(
      { inline_keyboard: newKeyboard },
      { chat_id: chatId, message_id: messageId }
    ).catch(err => console.error(err));
    
    // Answer the callback to remove the loading spinner
    bot.answerCallbackQuery(query.id, { text: 'Статус обновлен: Позвонили' });

  } else if (data === 'status_called') {
    newKeyboard = [[{ text: '⏳ Не звонили', callback_data: 'status_not_called' }]];
    
    bot.editMessageReplyMarkup(
      { inline_keyboard: newKeyboard },
      { chat_id: chatId, message_id: messageId }
    ).catch(err => console.error(err));

    bot.answerCallbackQuery(query.id, { text: 'Статус обновлен: Не звонили' });
  }
});

bot.on('polling_error', (error) => {
  console.error(error);
});

// HTTP endpoint for enrollment form submissions from pride-next
const app = express();
app.use(express.json({ limit: '8kb' }));

const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
const BOT_SHARED_SECRET = process.env.BOT_SHARED_SECRET;
const BOT_HTTP_PORT = process.env.BOT_HTTP_PORT || 3001;

if (!ADMIN_CHAT_ID || !BOT_SHARED_SECRET) {
  console.error('Error: ADMIN_CHAT_ID and BOT_SHARED_SECRET must be set in .env');
  process.exit(1);
}

app.post('/api/enroll', async (req, res) => {
  if (req.headers['x-auth'] !== BOT_SHARED_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  const { course, category, transmission, name, phone } = req.body || {};
  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: 'name+phone required' });
  }
  const msg =
    `🚗 Новая заявка\n\n` +
    `Имя: ${name}\n` +
    `Телефон: ${phone}\n` +
    `Курс: ${course}\n` +
    `Категория: ${category}\n` +
    `Коробка: ${transmission}`;
  try {
    await bot.sendMessage(ADMIN_CHAT_ID, msg, {
      reply_markup: {
        inline_keyboard: [[{ text: '⏳ Не звонили', callback_data: 'status_not_called' }]],
      },
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Telegram send failed', err);
    res.status(500).json({ error: 'telegram_failed' });
  }
});

app.listen(BOT_HTTP_PORT, () => {
  console.log(`Bot HTTP endpoint on :${BOT_HTTP_PORT}`);
});
