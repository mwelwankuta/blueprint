import { FigmaService } from './services/figmaService';
import { FileService } from './services/fileService';
import { CliService } from './services/cliService';
import { ClaudeService, GptService, AiServiceInterface } from './services/aiService';
import { logger } from './utils/logger';

async function main() {
  try {
    const figmaService = new FigmaService();
    const fileService = new FileService();
    const cliService = new CliService();

    logger.info('Fetching Figma file data...');
    const figmaData = await figmaService.getFigmaFile();

    logger.info('Extracting screens...');
    const allScreens = figmaService.extractScreens(figmaData.document.children);

    logger.info('Found the following screens:');
    allScreens.forEach(screen => logger.info(`- ${screen.name}`));

    const selectedScreens = await cliService.selectScreens(allScreens);

    const aiServiceChoice = await cliService.selectAiService();
    const aiService: AiServiceInterface = aiServiceChoice === 'claude' ? new ClaudeService() : new GptService();

    logger.info('Fetching image URLs...');
    const imageUrls = await figmaService.getImageUrls(selectedScreens);

    logger.info('Exporting screenshots...');
    await fileService.exportScreenshots(selectedScreens, imageUrls);

    logger.info('Generating Flutter code...');
    for (const screen of selectedScreens) {
      const code = await aiService.generateCode(screen);
      await fileService.writeFlutterCode(screen.name, code);
    }

    logger.info('Conversion completed successfully!');
  } catch (error) {
    logger.error('An error occurred:', error);
  }
}

main();