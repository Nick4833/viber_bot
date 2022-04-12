require("dotenv").config();
const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const TextMessage = require("viber-bot").Message.Text;
const PictureMessage = require("viber-bot").Message.Picture;
const RichMedia = require("viber-bot").Message.RichMedia;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const ItemsRoute = require("./routes/items");
const OrdersRoute = require("./routes/orders");
const CarouselContentGenerator = require("./carousel_content_generator");
const KeyboardGeneratorModule = require("./keyboard_generator");
const KeyboardItemGeneratorModule = require("./keyboard_item_generator");
const Item = require("./models/Item");
const Order = require("./models/Order");

const actionBodyYes = "Buy";
const actionBodyNo = "No";

var item_id = null;
var item_name = null;
var item_price = 0;
var item_phone = null;
var item_payment = null;

function redeemYesOrNoKeyboard() {
  let keyboardGenerator = new KeyboardGeneratorModule();
  keyboardGenerator.addElement("Buy", actionBodyYes, "#57B8FF");
  keyboardGenerator.addElement("Order Status", "order_status", "#57B8FF");
  keyboardGenerator.addElement("Talk to an Agent", actionBodyNo, "#57B8FF");
  keyboardGenerator.addElement("Back to Menu", "hi", "#57B8FF", null, true);
  return keyboardGenerator.build();
}
function paymentKeyboard() {
  let keyboardGenerator = new KeyboardGeneratorModule();
  keyboardGenerator.addElement(
    "Pay by Cash on Delivery",
    "cash_on_delivery",
    "#57B8FF"
  );
  keyboardGenerator.addElement("Back to Menu", "hi", "#57B8FF", null, true);
  return keyboardGenerator.build();
}

function redeemItemKeyboard(items) {
  let keyboardItemGenerator = new KeyboardItemGeneratorModule();
  for (const item of items) {
    keyboardItemGenerator.addElement(
      `${item.name} $${item.price}`,
      `buy ${item._id.toString()}`,
      "#57B8FF"
    );

    console.log(`BUY ${item._id.toString()}`);
  }
  return keyboardItemGenerator.build();
}

function orderStatusKeyboard(orders) {
  let orderKeyboardGenerator = new KeyboardGeneratorModule();
  for (order of orders) {
    orderKeyboardGenerator.addElement(
      `Your Order for ${order.item_name} is currently ${order.orderStatus}`,
      "no",
      "#57B8FF",
      null,
      false
    );
  }
  orderKeyboardGenerator.addElement(
    "Back to Menu",
    "hi",
    "#57B8FF",
    null,
    true
  );
  return orderKeyboardGenerator.build();
}

const app = express();

//Connect to the Database

const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected"))
    .catch((e) => console.log(e));
};

connectDB();

//Routes for the app

app.get("/", (req, res) => {
  res.send(`We're home...`);
});

app.get("/api", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Routes for viber API

if (!process.env.BOT_ACCOUNT_TOKEN) {
  console.log("The fecal bot token cannot befound.");
}

if (!process.env.EXPOSE_URL) {
  console.log("The fecal bot could not find the exposed url.");
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

fecalBot.on(BotEvents.MESSAGE_RECEIVED, async (message, response) => {
  let messageActionBody = message.text.toLowerCase();
  const names = [];
  const items = await Item.find();
  for (const item of items) {
    names.push(item._id.toString());
  }
  console.log(names);
  if (messageActionBody === "buy") {
    // let carouselBuilder = new CarouselContentGenerator("#FFFFFF");
    // for (const item of items) {
    //   carouselBuilder.addElement(
    //     item.name,
    //     item.description,
    //     "https://github.com/devrelv/icons/blob/master/bot_head.png",
    //     "Call to action 1",
    //     "buy",
    //     false
    //   );
    // }

    response.send(
      new TextMessage("Choose an item to buy", redeemItemKeyboard(items))
    );
  }
  for (const item of items) {
    if (messageActionBody === "buy " + item._id.toString()) {
      item_id = item._id.toString();
      item_name = item.name;
      item_phone = response.userProfile.id;
      item_price = item.price;
      response.send(
        new TextMessage("Do you wish to buy this item?", paymentKeyboard())
      );
    }
  }
});

fecalBot.onTextMessage(/cash_on_delivery/, async (message, response) => {
  if (item_id === null) {
    console.log("No item selected");
  }
  const order = new Order({
    item_name: item_name,
    price: item_price,
    phone: item_phone,
    payment: "cash_on_deivery",
  });

  try {
    const savedOrder = await order.save();
    response.send(
      new TextMessage(
        `Order Successful. Your Order No is ${savedOrder._id} Thanks for your patient.`
      )
    );
  } catch (err) {
    console.log({ message: err });
  }
});

fecalBot.onTextMessage(/order_status/, async (message, response) => {
  const orders = await Order.find({ phone: response.userProfile.id });
  console.log("show keyboard bruh");
  response.send(
    new TextMessage("Your orders are as follow.", orderStatusKeyboard(orders))
  );
});

fecalBot.onTextMessage(/^hi|hello$/i, async (message, response) => {
  const items = await Item.find();
  response.send(
    new PictureMessage(
      "https://ih1.redbubble.net/image.2487428601.3851/st,small,507x507-pad,600x600,f8f8f8.jpg",

      "Hey, This is our fecal store. Do you want some NFTs or shit and giggles, cause we have them.",
      null,
      redeemYesOrNoKeyboard()
    )
  );
});

// fecalBot.onTextMessage(
//   "BUY 622ace10718aa0852ae4dd8f",
//   async (message, response) => {
//     response.send(
//       new TextMessage("Do you wish to buy this item?", redeemYesOrNoKeyboard())
//     );
//   }
// );

const port = process.env.PORT || 3001;

app.use("/viber/webhook", fecalBot.middleware());

//Listen to the port given to start the app
app.listen(port, () => {
  console.log(`Application is running on port: ${port}`);
  // fecalBot
  //   .setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`)
  //   .catch((error) => {
  //     console.log("Cannot set webhook on the server. Is the fecal even funny?");
  //     console.error(error);
  //     process.exit(1);
  //   });
});

//Middleware for the app
app.use(bodyParser.json());
app.use(cors());

app.use("/items", ItemsRoute);
app.use("/orders", OrdersRoute);
