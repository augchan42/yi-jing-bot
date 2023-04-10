const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("read")
    .setDescription("Does a Yi Jing reading."),
  async execute(interaction) {
    const hexagrams = require("../hexagrams");
    const resultingText = [""];
    // * Configures options to pass for CLI

    const toss = () => {
      // * traditional calculations to generate i-ching from coin flips assign 'heads' the value of 3 and 'tails' the value of two.
      return Math.floor(Math.random() * 2) === 0 ? 3 : 2;
    };
    const generateLine = () => {
      // * Each line's value is the sum of the values generated by the toss of three coins
      return toss() + toss() + toss();
    };

    const logFormat = (type, label) => {
      const result = locateHexagram(type);
      const resultString = `${
        "\nHexagram " +
        result.number +
        ": " +
        result.symbol +
        " - " +
        result.name.en +
        " | " +
        result.name.zh
      }  
      ${label}`;

      resultingText.push(resultString);
    };

    const generateHexagram = () => {
      // * Each hexagram is composed of 6 lines
      let hexagram = "";
      for (let i = 0; i < 6; i++) {
        hexagram += generateLine();
      }
      convertHexagrams(hexagram);
    };

    const convertHexagrams = (hexagram) => {
      // * Lines with a value of 6 or 9 are considered "changing" and as a result, a second hexagram is generated
      let changing = false;
      let primary = "";
      let relating = "";
      for (let i = 0; i < hexagram.length; i++) {
        if (hexagram[i] === "6") {
          changing = true;
          primary += 8;
          relating += 7;
        } else if (hexagram[i] === "9") {
          changing = true;
          primary += 7;
          relating += 8;
        } else {
          primary += hexagram[i];
          relating += hexagram[i];
        }
      }
      if (changing) {
        logFormat(primary, "Primary");
        logFormat(relating, "Relating");
      } else {
        logFormat(primary, "Primary");
      }
    };

    const locateHexagram = (hex) => {
      hex = Number(hex);
      const found = hexagrams.find((e) => {
        return e.pattern === hex;
      });
      return found;
    };
    const generatedHexagram = generateHexagram();

    resultingText.shift();
    await interaction.reply(`${resultingText}`);
  },
};
