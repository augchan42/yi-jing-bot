import { generateLine } from './toss.js';

export const generateHexagram = () => {
  let hexagram = "";
  let changingLines = [];
  
  // Generate the standard 6 lines
  for (let i = 0; i < 6; i++) {
    const line = generateLine();
    hexagram += line;
    // Keep track of changing lines (6 or 9) and their position (bottom up, 1-6)
    if (line === "6" || line === "9") {
      changingLines.push({
        position: i + 1,
        value: line
      });
    }
  }

  // For hexagrams 1 and 2, check if we need to add usage line
  // If all lines are yang (9s) for hexagram 1 or all yin (6s) for hexagram 2
  const allYang = hexagram.split('').every(line => line === "9");
  const allYin = hexagram.split('').every(line => line === "6");
  
  if (allYang || allYin) {
    changingLines.push({
      position: 7,
      value: allYang ? "9" : "6"
    });
  }
  
  return { hexagram, changingLines };
};

export const convertHexagrams = (hexagramData) => {
  const { hexagram, changingLines } = hexagramData;
  let changing = changingLines.length > 0;
  let primary = "";
  let relating = "";
  
  // Convert the standard 6 lines
  for (let i = 0; i < hexagram.length; i++) {
    if (hexagram[i] === "6") {
      primary += 8;
      relating += 7;
    } else if (hexagram[i] === "9") {
      primary += 7;
      relating += 8;
    } else {
      primary += hexagram[i];
      relating += hexagram[i];
    }
  }
  
  return { changing, primary, relating, changingLines };
};

export const formatChangingLines = (changingLines, hexagram) => {
  return changingLines.map(line => {
    const lineType = line.value === "6" ? "yin" : "yang";
    const lineText = hexagram.lines[line.position - 1]; // Arrays are 0-based, positions are 1-based
    
    // Special formatting for usage line (position 7)
    if (line.position === 7) {
      return `Line \`${line.position}\` (Usage): ${lineText}`;
    }
    
    return `Line \`${line.position}\` (${lineType}): ${lineText}`;
  }).join('\n');
};

export const locateHexagram = (hex, hexagrams) => {
  hex = Number(hex);
  return hexagrams.find((e) => e.pattern === hex);
};

export const formatHexagramSymbol = (result) => {
  return result.unicode || result.symbol;
};