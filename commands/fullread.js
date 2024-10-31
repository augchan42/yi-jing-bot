import { SlashCommandBuilder } from "discord.js";
import { 
  generateHexagram, 
  convertHexagrams, 
  locateHexagram,
  formatChangingLines 
} from "../utils/divination/hexagram.js";
import hexagrams from "../hexagrams.js";

export default {
  data: new SlashCommandBuilder()
    .setName("fullread")
    .setDescription("Does a lengthy, opinionated Yi Jing reading."),
  async execute(interaction) {
    const resultingText = [];

    const logFormat = (result, label) => {
      const resultString = `${
        "\nHexagram " +
        result.number +
        ": " +
        result.symbol +
        " - " +
        result.name.en +
        " | " +
        result.name.zh
      } ${" (" + label + ")"}
      ${result.image}
      ${"Judgment: "}
      ${result.judgment}`;

      resultingText.push(resultString);
    };

    const hexagramData = generateHexagram();
    const { changing, primary, relating, changingLines } = convertHexagrams(hexagramData);

    const primaryResult = locateHexagram(primary, hexagrams);
    logFormat(primaryResult, "Primary");

    if (changing) {            
      const relatingResult = locateHexagram(relating, hexagrams);
      logFormat(relatingResult, "Relating");
      
       // Add changing lines information with the specific line texts
      resultingText.push("\nChanging Lines:");
      resultingText.push(formatChangingLines(changingLines, primaryResult));
       
    }

    await interaction.reply(resultingText.join('\n'));
  },
};