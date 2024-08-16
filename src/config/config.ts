import dotenv from 'dotenv';

dotenv.config();

export const config = {
  figma: {
    personalAccessToken: process.env.FIGMA_PERSONAL_ACCESS_TOKEN,
    fileKey: process.env.FIGMA_FILE_KEY,
  },
  output: {
    folder: process.env.OUTPUT_FOLDER || 'output',
  },
  claude: {
    apiKey: process.env.CLAUDE_API_KEY,
  },
  gpt: {
    apiKey: process.env.GPT_API_KEY,
  },
};