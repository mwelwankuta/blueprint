import inquirer from 'inquirer';
import { FigmaNode, ScreenChoice } from '../types/types';

export class CliService {
  async selectScreens(screens: FigmaNode[]): Promise<FigmaNode[]> {
    const choices: ScreenChoice[] = screens.map(screen => ({
      name: screen.name,
      value: screen
    }));

    const { selectedScreens } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedScreens',
        message: 'Select the screens you want to build:',
        choices: choices,
        validate: (answer: FigmaNode[]) => {
          if (answer.length < 1) {
            return 'You must choose at least one screen.';
          }
          return true;
        }
      }
    ]);

    return selectedScreens;
  }

  async selectAiService(): Promise<'claude' | 'gpt'> {
    const { aiService } = await inquirer.prompt([
      {
        type: 'list',
        name: 'aiService',
        message: 'Select the AI service for code generation:',
        choices: [
          { name: 'Claude', value: 'claude' },
          { name: 'GPT', value: 'gpt' },
        ],
      },
    ]);

    return aiService;
  }
}