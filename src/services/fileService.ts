import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { FigmaNode, ImageUrls } from '../types/types';
import { config } from '../config/config';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

export class FileService {
  async exportScreenshots(screens: FigmaNode[], imageUrls: ImageUrls): Promise<void> {
    const imagesFolder = path.join(config.output.folder, 'images');
    await mkdir(imagesFolder, { recursive: true });

    await Promise.all(
      screens.map(async (screen) => {
        const imageUrl = imageUrls[screen.id];
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        await writeFile(path.join(imagesFolder, `${screen.name}.png`), response.data);
      })
    );
  }

  async writeFlutterCode(screenName: string, code: string): Promise<void> {
    const widgetsFolder = path.join(config.output.folder, 'e_venture_widgets');
    await mkdir(widgetsFolder, { recursive: true });

    await writeFile(path.join(widgetsFolder, `${screenName.toLowerCase()}_screen.dart`), code);
  }
}