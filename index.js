const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.toLowerCase().includes("start")) {
    bot.sendMessage(chatId, "🚀 VisionX Arbitrage Bot ist aktiv.");
    startSimulation(chatId);
  }
});

function startSimulation(chatId) {
  const priceBuy = 100.00;
  const priceSell = 101.23;
  const profit = priceSell - priceBuy;

  if (profit > 0.5) {
    bot.sendMessage(chatId, `💰 Arbitrage gefunden!\nBuy: ${priceBuy} €\nSell: ${priceSell} €\nGewinn: +${profit.toFixed(2)} €\n(Simulation)`);
  }
}