export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

export interface FigmaFile {
  document: {
    children: FigmaNode[];
  };
}

export interface ImageUrls {
  [key: string]: string;
}

export interface ScreenChoice {
  name: string;
  value: FigmaNode;
}