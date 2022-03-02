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
      Columns: 6,
      Rows: 1,
      Silent: isSilent,
      BgColor: backgroundColor,
      ActionType: "reply",
      ActionBody: actionBody,
      Text: `<font color='${fontColor}'><b>${text}</b></font>`,
      TextVAlign: "middle",
      TextHAlign: "center",
      TextSize: "large",
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
