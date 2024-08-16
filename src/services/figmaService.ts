import axios from 'axios';
import { config } from '../config/config';
import { FigmaFile, FigmaNode, ImageUrls } from '../types/types';

export class FigmaService {
  private readonly baseUrl = 'https://api.figma.com/v1';

  async getFigmaFile(): Promise<FigmaFile> {
    const response = await axios.get<FigmaFile>(`${this.baseUrl}/files/${config.figma.fileKey}`, {
      headers: { 'X-Figma-Token': config.figma.personalAccessToken },
    });
    return response.data;
  }

  extractScreens(nodes: FigmaNode[]): FigmaNode[] {
    return nodes.flatMap((node) =>
      node.type === 'CANVAS' ? node.children?.filter((child) => child.type === 'FRAME') || [] : []
    );
  }

  async getImageUrls(screens: FigmaNode[]): Promise<ImageUrls> {
    const ids = screens.map((screen) => screen.id).join(',');
    const response = await axios.get<{ images: ImageUrls }>(
      `${this.baseUrl}/images/${config.figma.fileKey}?ids=${ids}&format=png`,
      {
        headers: { 'X-Figma-Token': config.figma.personalAccessToken },
      }
    );
    return response.data.images;
  }
}