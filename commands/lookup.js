import { SlashCommandBuilder } from "discord.js";
import hexagrams from "../hexagrams.js";
import { formatHexagramResult } from "../utils/divination/formatter.js";

export default {
  data: new SlashCommandBuilder()
    .setName("lookup")
    .setDescription("Look up a specific hexagram and optionally specific lines")
    .addIntegerOption(option =>
      option
        .setName("hexagram")
        .setDescription("The hexagram number (1-64)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(64)
        .setAutocomplete(true)
    )
    .addStringOption(option =>
        option
          .setName("lines")
          .setDescription("Which lines to look up (e.g., '1,3,5' or '2 4 6')")
          .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName("preset")
        .setDescription("Or choose a preset line combination")
        .setRequired(false)
        .addChoices(
          { name: 'Lower Trigram (1,2,3)', value: '1,2,3' },
          { name: 'Upper Trigram (4,5,6)', value: '4,5,6' },
          { name: 'All Regular Lines (1-6)', value: '1,2,3,4,5,6' },
          { name: 'All Lines Including Usage (1-7)', value: '1,2,3,4,5,6,7' }
        )
  ),
    async execute(interaction) {
      const hexagramNumber = interaction.options.getInteger("hexagram");
      const lineInput = interaction.options.getString("lines");
      const presetInput = interaction.options.getString("preset");
  
      // Find the hexagram
      const hexagram = hexagrams.find(h => h.number === hexagramNumber);
      
      if (!hexagram) {
        return await interaction.reply({
          content: `Could not find hexagram ${hexagramNumber}`,
          ephemeral: true
        });
      }
  
      const resultText = [];
      resultText.push(formatHexagramResult(hexagram, ""));
      resultText.push(`\n**Image:**\n${hexagram.image}`);
      resultText.push(`\n**Judgment:**\n${hexagram.judgment}`);
  
      // Handle line selection
      const finalLineInput = lineInput || presetInput;
      const maxLines = (hexagram.number === 1 || hexagram.number === 2) ? 7 : 6;
  
      if (finalLineInput) {
        const selectedLines = finalLineInput
          .split(/[,\s]+/)
          .map(num => parseInt(num.trim()))
          .filter(num => !isNaN(num) && num >= 1 && num <= maxLines);
  
        if (selectedLines.length === 0) {
          resultText.push(`\n*Invalid line selection. Please use numbers 1-${maxLines}, separated by commas or spaces.*`);
        } else {
          resultText.push(`\n**Selected Lines:**`);
          selectedLines.forEach(lineNum => {
            const lineText = hexagram.lines[lineNum - 1];
            if (lineText) {
              if (lineNum === 7) {
                resultText.push(`\`${lineNum}\` (Usage): ${lineText}`);
              } else {
                resultText.push(`\`${lineNum}\`: ${lineText}`);
              }
            }
          });
        }
      } else {
        // Show all lines if no selection
        resultText.push(`\n**Lines:**`);
        hexagram.lines.forEach((line, index) => {
          if (index === 6) {  // 7th line (index 6)
            resultText.push(`\`${index + 1}\` (Usage): ${line}`);
          } else {
            resultText.push(`\`${index + 1}\`: ${line}`);
          }
        });
      }
  
      await interaction.reply(resultText.join('\n'));
    },
};