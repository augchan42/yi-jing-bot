import { SlashCommandBuilder } from "discord.js";
import { 
  generateHexagram, 
  convertHexagrams, 
  locateHexagram,
  formatChangingLines 
} from "../utils/divination/hexagram.js";
import hexagrams from "../hexagrams.js";
import { formatHexagramResult } from "../utils/divination/formatter.js";

export default {
  data: new SlashCommandBuilder()
    .setName("fullread")
    .setDescription("Does a lengthy, opinionated Yi Jing reading."),
  async execute(interaction) {
    const resultingText = [];

    const logFormat = (result, label) => {
      resultingText.push(formatHexagramResult(result, label));
      resultingText.push(`\n**Image:**\n${result.image}`);
      resultingText.push(`\n**Judgment:**\n${result.judgment}`);
    };

    const hexagramData = generateHexagram();
    const { changing, primary, relating, changingLines } = convertHexagrams(hexagramData);

    const primaryResult = locateHexagram(primary, hexagrams);
    logFormat(primaryResult, "Primary");

    if (changing) {           
      const relatingResult = locateHexagram(relating, hexagrams);
      logFormat(relatingResult, "Relating");

       // Add changing lines information first
       resultingText.push("\n**Changing Lines:**");
       resultingText.push(formatChangingLines(changingLines, primaryResult));
    }


    await interaction.reply(resultingText.join('\n'));
  },
};