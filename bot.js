const TelegramBot = require('node-telegram-bot-api')
const telegram = new TelegramBot("812665723:AAFTMGh18B5ffJhtmKQHJr11Pj2H8NzmNFs", { polling: true })
const translate = require('node-google-translate-skidz')

telegram.on("text", (message) => {
  translate({
    text: message.text,
    target: 'en',
  }, (result) => telegram.sendMessage(message.chat.id, result.translation))
})


telegram.on("inline_query", (query) => {
  if (query.query !== '') {
    translate({
      text: query.query,
      target: 'en',
    }, (result) => {
      telegram.answerInlineQuery(query.id, [
        {
          type: "article",
          id: "translatearticle",
          title: "Traducime esto",
          input_message_content: {
            message_text: result.translation
          }
        }
      ])
    })
  }
})