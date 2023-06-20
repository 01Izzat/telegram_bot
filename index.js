const telegramApi = require("node-telegram-bot-api");

const api = "6017937428:AAFrw_J1OH-scNvFrlXxvTUwXVWCzSPvohI";

const bot = new telegramApi(api, { polling: true });

const chats = {};
const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "1", callback_data: "1" },
        { text: "2 ", callback_data: "2" },
        { text: "3", callback_data: "3" },
      ],
      [
        { text: "4", callback_data: "4" },
        { text: "5 ", callback_data: "5" },
        { text: "6", callback_data: "6" },
      ],
      [
        { text: "7", callback_data: "7" },
        { text: "8 ", callback_data: "8" },
        { text: "9", callback_data: "9" },
      ],
      [{ text: "0 ", callback_data: "0" }],
    ],
  }),
};

const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Boshqattan boshlash", callback_data: "/again" }],
    ],
  }),
};

bot.setMyCommands([
  { command: "/start", description: "Boshladik" },
  { command: "/info", description: "Siz xaqingizda ma'lumot" },
  { command: "/game", description: "Play game" },
]);

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, "0 dan 9 gacha son tanladim");
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  return bot.sendMessage(chatId, "Sonni top", gameOptions);
};
const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp"
      );
      return bot.sendMessage(
        chatId,
        `Assalomu Alaykom va Rahmatullohi va Barakatuh`
      );
    }

    if (text === "/info") {
      return bot.sendMessage(chatId, `Sizning ismingiz ${msg.from.first_name}`);
    }

    if (text === "/game") {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, "Siz noto'g'ri komanda kiritingiz");
  });

  bot.on("callback_query", (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "/again") {
      return startGame(chatId);
    }
    if (data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Tabrikliman siz to'g'ri topdingiz ${chats[chatId]}`
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Noto'g'ri,  Javob: ${chats[chatId]}`,
        againOptions
      );
    }
  });
};

start();
