"use strict";

const DEFAULT_FONT_COLOR = "#FFFFFF";
const DEFAULT_IS_SILENT_ACTION = false;

function KeyboardGenerator() {
  this.elements = [];
}

KeyboardGenerator.prototype.randomColor = function () {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

KeyboardGenerator.prototype.elementToKeyboardJSON = function (
  text,
  actionBody,
  backgroundColor,
  fontColor,
  isSilent
) {
  return [
    {
      Columns: 1,
      Rows: 2,
      ActionType: "reply",
      ActionBody: actionBody,
      BgColor: "#e0e0e0",
      Text: `<font color='#ffffff'>${text}</font>`,
      TextHAlign: "center",
      TextVAlign: "bottom",
      Silent: true,
      Image:
        "https://i.pinimg.com/originals/62/98/b0/6298b026a65cf80bcf9dce061e9b79c9.png",
    },
  ];
};

KeyboardGenerator.prototype.addElement = function (
  text,
  actionBody,
  backgroundColor,
  fontColor,
  isSilent
) {
  let addedElements = this.elementToKeyboardJSON(
    text,
    actionBody,
    backgroundColor || this.randomColor(),
    fontColor || DEFAULT_FONT_COLOR,
    isSilent || DEFAULT_IS_SILENT_ACTION
  );

  this.elements = this.elements.concat(addedElements);
};

KeyboardGenerator.prototype.build = function () {
  return {
    Revision: 1,
    Type: "keyboard",
    Buttons: this.elements,
  };
};

module.exports = KeyboardGenerator;
