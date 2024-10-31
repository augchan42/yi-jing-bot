import { generateLine } from './toss.js';

export const generateHexagram = () => {
  let hexagram = "";
  let changingLines = [];
  
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
  
  return { hexagram, changingLines };
};

export const convertHexagrams = (hexagramData) => {
  const { hexagram, changingLines } = hexagramData;
  let changing = changingLines.length > 0;
  let primary = "";
  let relating = "";
  
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
    return `Line ${line.position} (${lineType}): ${lineText}`;
  }).join('\n');
};

export const locateHexagram = (hex, hexagrams) => {
  hex = Number(hex);
  return hexagrams.find((e) => e.pattern === hex);
};

export const formatHexagramSymbol = (result) => {
  return result.unicode || result.symbol; // Using unicode if available, fallback to symbol
};