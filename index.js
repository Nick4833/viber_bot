require("dotenv").config();
const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const PictureMessage = require("viber-bot").Message.Picture;
const RichMedia = require("viber-bot").Message.RichMedia;
const { response } = require("express");
const express = require("express");

const CarouselContentGenerator = require("./carousel_content_generator");
const KeyboardGeneratorModule = require("./keyboard_generator");

const actionBodyYes = "Buy";
const actionBodyNo = "No";

function redeemYesOrNoKeyboard() {
  let keyboardGenerator = new KeyboardGeneratorModule();
  keyboardGenerator.addElement("Buy", actionBodyYes, "#57B8FF");
  keyboardGenerator.addElement("Talk to an Agent", actionBodyNo, "#57B8FF");
  return keyboardGenerator.build();
}

function sendQuestion(response) {
  return response.send(
    new TextMessage("Would you like to build a bot?", redeemYesOrNoKeyboard())
  );
}

const app = express();

if (!process.env.BOT_ACCOUNT_TOKEN) {
  console.log("The fecal bot token cannot befound.");
  return;
}

if (!process.env.EXPOSE_URL) {
  console.log("The fecal bot could not find the exposed url.");
  return;
}

const fecalBot = new ViberBot({
  authToken: process.env.BOT_ACCOUNT_TOKEN,
  name: "Fecal Bot",
  avatar: "https://c.tenor.com/HhJ8Db34PYAAAAAi/vargskelethor-vinesauce.gif",
});

fecalBot.on(BotEvents.SUBSCRIBED, (response) => {
  response.send(
    new TextMessage(
      `Hi there ${response.userProfile.name}. I am ${fecalBot.name}! Feel free to ask me anything`
    )
  );
});

fecalBot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  let messageActionBody = message.text.toUpperCase();
  if (messageActionBody === "BUY") {
    let carouselBuilder = new CarouselContentGenerator("#FFFFFF");
    carouselBuilder.addElement(
      "Card title 1",
      "Card Subtitle 1",
      "https://github.com/devrelv/icons/blob/master/bot_head.png",
      "Call to action 1",
      "action body 1",
      true
    );

    carouselBuilder.addElement(
      "Card title 2",
      "Card Subtitle 2",
      "https://github.com/devrelv/icons/blob/master/gifts.png",
      "Call to action 2",
      "action body 2",
      true
    );

    response.send(new RichMedia(carouselBuilder.build()));
  }
  //   response.send(new TextMessage(`Message received.`));
});

const SAMPLE_RICH_MEDIA = {
  ButtonsGroupColumns: 6,
  ButtonsGroupRows: 5,
  BgColor: "#FFFFFF",
  Buttons: [
    {
      ActionBody: "https://www.google.com",
      ActionType: "open-url",
      BgMediaType: "picture",
      Image:
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
      BgColor: "#000000",
      TextOpacity: 60,
      Rows: 4,
      Columns: 6,
    },
    {
      ActionBody: "https://www.facebook.com",
      ActionType: "open-url",
      BgColor: "#85bb65",
      Text: "Buy",
      TextOpacity: 60,
      Rows: 1,
      Columns: 6,
    },
  ],
};
message = new RichMedia(SAMPLE_RICH_MEDIA);

fecalBot.onTextMessage(/^hi|hello$/i, (message, response) => {
  response.send(
    new PictureMessage(
      "https://ih1.redbubble.net/image.2487428601.3851/st,small,507x507-pad,600x600,f8f8f8.jpg",

      "Hey, This is our fecal store. Do you want some NFTs or shit and giggles, cause we have them.",
      null,
      redeemYesOrNoKeyboard()
    )
  );
});

// fecalBot.onTextMessage(/^buy|buy our products$/i, (message, response) => {
//   let carouselBuilder = new CarouselContentGenerator("#FFFFFF");
//   carouselBuilder.addElement(
//     "Card title 1",
//     "Card Subtitle 1",
//     "https://github.com/devrelv/icons/blob/master/bot_head.png",
//     "Call to action 1",
//     "action body 1",
//     true
//   );

//   carouselBuilder.addElement(
//     "Card title 2",
//     "Card Subtitle 2",
//     "https://github.com/devrelv/icons/blob/master/gifts.png",
//     "Call to action 2",
//     "action body 2",
//     true
//   );

//   response.send(new RichMedia(carouselBuilder.build()));
// });

const port = process.env.PORT || 3000;

app.use("/viber/webhook", fecalBot.middleware());

app.listen(port, () => {
  console.log(`Application is running on port: ${port}`);
  fecalBot
    .setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`)
    .catch((error) => {
      console.log("Cannot set webhook on the server. Is the fecal even funny?");
      console.error(error);
      process.exit(1);
    });
});
