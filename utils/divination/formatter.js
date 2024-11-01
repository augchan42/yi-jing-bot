export const formatHexagramResult = (result, label) => {
  return `\n**Hexagram ${result.number}: ${result.symbol} - ${result.name.en} | ${result.name.zh}
  ${label}**`;
};

// New concise formatting functions
export const formatHexagramSymbol = (result) => {
  return `**${result.unicode || result.symbol}** (${result.number})`;
};

export const formatConciseChangingLines = (changingLines) => {
  // Convert line positions to string, e.g., "2,5" for lines 2 and 5 changing
  return changingLines.length > 0 
    ? `[${changingLines.map(line => line.position).join(',')}]`
    : '';
};

export const formatConciseReading = (primary, relating = null, changingLines = []) => {
  if (relating) {
    return `${formatHexagramSymbol(primary)} ${formatConciseChangingLines(changingLines)} → ${formatHexagramSymbol(relating)}`;
  }
  return formatHexagramSymbol(primary);
};