const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const bot = new TelegramBot(process.env.BOT_TOKEN);
bot.setWebHook(`${process.env.APP_URL}/bot${process.env.BOT_TOKEN}`);

app.use(express.json());

app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text.toLowerCase().includes('start')) {
        bot.sendMessage(chatId, '🤖 VisionX Arbitrage Bot ist aktiv.');
        startSimulation(chatId);
    }
});

function startSimulation(chatId) {
    const priceBuy = 100.00;
    const priceSell = 101.23;
    const profit = priceSell - priceBuy;

    if (profit > 0.5) {
        bot.sendMessage(chatId, `🔁 Arbitrage gefunden!\nBuy: ${priceBuy}\nSell: ${priceSell}\nGewinn: ${profit.toFixed(2)}\n(Simulation)`);
    }
}

app.listen(port, () => {
    console.log(`✅ Server läuft auf Port ${port}`);
});
