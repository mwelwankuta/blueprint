# Blueprint

This tool converts Figma designs to Flutter code by exporting screens as PNG images and generating corresponding Flutter widget code using AI services (Claude or GPT).

## Features

- Fetches Figma file data
- Lists available screens and allows user selection
- Exports selected screens as PNG images
- Generates Flutter widget code for each selected screen using Claude or GPT
- Saves generated code in separate files

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env` and fill in your Figma personal access token, file key, and AI service API keys
4. Run `npm start` to execute the tool

## Usage

1. The tool will fetch and list all available screens from your Figma file
2. Select the screens you want to convert
3. Choose between Claude and GPT for code generation
4. The tool will export screenshots and generate Flutter code for the selected screens

## Environment Variables

- `FIGMA_PERSONAL_ACCESS_TOKEN`: Your Figma personal access token
- `FIGMA_FILE_KEY`: The key of the Figma file you want to convert
- `OUTPUT_FOLDER`: The folder where generated files will be saved (default: 'output')
- `CLAUDE_API_KEY`: Your Claude API key
- `GPT_API_KEY`: Your GPT API key

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
