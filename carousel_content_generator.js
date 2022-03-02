"use strict";
const RichMediaMessage = require("viber-bot").Message.RichMedia;

function CarouselContentGenerator(backgroundColor) {
  this.backgroundColor = backgroundColor;
  this.elements = [];
}

CarouselContentGenerator.prototype.elementToCarouselJSON = function (
  title,
  subtitle,
  imageUrl,
  callToAction,
  actionBody,
  isSilent
) {
  return [
    {
      Columns: 6,
      Rows: 3,
      Silent: isSilent,
      ActionType: "none",
      Image: imageUrl,
    },
    {
      Columns: 6,
      Rows: 2,
      Text: `<font color=#323232><b>${title}</b></font><br><font color=#777777>${subtitle}</font>`,
      Silent: isSilent,
      ActionType: "none",
      TextSize: "medium",
      TextVAlign: "middle",
      TextHAlign: "left",
    },
    {
      Columns: 6,
      Rows: 1,
      Silent: isSilent,
      Text: `<b><font color=\'#FFFFFF\'>${callToAction}</b></font>`,
      TextSize: "large",
      TextHAlign: "center",
      TextVAlign: "middle",
      ActionType: "reply",
      ActionBody: actionBody,
      BgColor: "#E2211D",
    },
  ];
};

CarouselContentGenerator.prototype.addElement = function (
  title,
  subtitle,
  imageUrl,
  callToAction,
  actionBody,
  isSilent
) {
  let addedElements = this.elementToCarouselJSON(
    title,
    subtitle,
    imageUrl,
    callToAction,
    actionBody,
    isSilent
  );

  this.elements = this.elements.concat(addedElements);
};

CarouselContentGenerator.prototype.build = function () {
  return {
    ButtonsGroupColumns: 6,
    ButtonsGroupRows: 6,
    BgColor: this.backgroundColor,
    Buttons: this.elements,
  };
};

module.exports = CarouselContentGenerator;
