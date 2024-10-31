import { SlashCommandBuilder } from "discord.js";
import { 
  generateHexagram, 
  convertHexagrams, 
  locateHexagram 
} from "../utils/divination/hexagram.js";
import { formatConciseReading } from "../utils/divination/formatter.js";
import hexagrams from "../hexagrams.js";

export default {
  data: new SlashCommandBuilder()
    .setName("read")
    .setDescription("Does a quick Yi Jing reading showing only the hexagram symbols."),
  async execute(interaction) {
    try {
      const hexagramData = generateHexagram();
      const { changing, primary, relating, changingLines } = convertHexagrams(hexagramData);


      const primaryResult = locateHexagram(primary, hexagrams);
      
      if (!primaryResult) {
        throw new Error(`Could not find hexagram for pattern: ${primary}`);
      }

      let readingResult;
      
      if (changing) {
        const relatingResult = locateHexagram(relating, hexagrams);
        if (!relatingResult) {
          throw new Error(`Could not find hexagram for pattern: ${relating}`);
        }
        readingResult = formatConciseReading(primaryResult, relatingResult, changingLines);
      } else {
        readingResult = formatConciseReading(primaryResult);
      }

      await interaction.reply(readingResult);
    } catch (error) {
      console.error('Error in read command:', error);
      await interaction.reply({ 
        content: 'There was an error generating your reading.', 
        ephemeral: true 
      });
    }
  },
};