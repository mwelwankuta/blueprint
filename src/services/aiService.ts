import axios from 'axios';
import { FigmaNode } from '../types/types';
import { config } from '../config/config';

export interface AiServiceInterface {
  generateCode(screen: FigmaNode): Promise<string>;
}

export class ClaudeService implements AiServiceInterface {
  async generateCode(screen: FigmaNode): Promise<string> {
    const response = await axios.post('https://api.anthropic.com/v1/completions', {
      prompt: `Generate Flutter code for a screen named ${screen.name}`,
      model: 'claude-v1',
      max_tokens_to_sample: 1000,
    }, {
      headers: {
        'Authorization': `Bearer ${config.claude.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.completion;
  }
}

export class GptService implements AiServiceInterface {
  async generateCode(screen: FigmaNode): Promise<string> {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Generate Flutter code for a screen named ${screen.name}`,
      max_tokens: 1000,
    }, {
      headers: {
        'Authorization': `Bearer ${config.gpt.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.choices[0].text;
  }
}