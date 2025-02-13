export function formatWalletAddress(text = '', firstChunk = 4, lastChunk = 4) {
    if (typeof text === 'string' && text?.length > 10) {
      return `${text.slice(0, firstChunk)}...${text.slice(-lastChunk)}`;
    }
    return text;
  }
  