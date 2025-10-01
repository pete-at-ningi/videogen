# Synthesia Video Generator

A modern web application for generating AI-powered videos using the Synthesia API. Built with Next.js, Express.js, and styled-components.

## Features

- 🎥 Create AI-generated videos with custom scripts
- 👥 Multiple avatar options
- 🎨 Various background choices
- 📊 Real-time video status polling
- 📱 Responsive design
- 🎯 Modern, intuitive UI

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and add your Synthesia API key:

```bash
cp env.example .env.local
```

Edit `.env.local` and add your Synthesia API key:

```
SYNTHESIA_API_KEY=your_synthesia_api_key_here
PORT=3000
```

### 3. Get Your Synthesia API Key

1. Sign up at [Synthesia.io](https://synthesia.io)
2. Navigate to your API settings
3. Generate an API key
4. Add it to your `.env.local` file

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## How to Use

1. **View Videos**: The main page displays all your generated videos
2. **Create Video**: Click "Create New Video" to open the generation modal
3. **Fill Form**: Enter a title, script, choose an avatar and background
4. **Submit**: Click "Create Video" to start generation
5. **Monitor Progress**: The app automatically polls for video status updates
6. **Download**: Once complete, download links will appear on video cards

## API Endpoints

- `GET /api/videos` - Fetch all videos
- `POST /api/videos` - Create a new video
- `GET /api/videos/:id` - Get specific video status

## Project Structure

```
├── components/          # React components
│   ├── GlobalStyle.js   # Global CSS styles
│   ├── Layout.js        # Page layout wrapper
│   ├── VideoCard.js     # Individual video display
│   └── VideoModal.js    # Video creation modal
├── pages/               # Next.js pages
│   ├── _app.js         # App wrapper with theming
│   └── index.js        # Main page
├── shared-components/   # Shared utilities
│   └── utils/
│       └── makeTheme.js # Theme configuration
├── server.js           # Express server with API routes
└── next.config.js      # Next.js configuration
```

## Technologies Used

- **Frontend**: Next.js, React, styled-components
- **Backend**: Express.js, Node.js
- **API**: Synthesia API
- **Styling**: styled-components with custom theme system

## Development

The application uses a custom theme system located in `shared-components/utils/makeTheme.js` for consistent styling across all components.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Error Handling

The application includes comprehensive error handling for:

- API connection issues
- Invalid API keys
- Network timeouts
- Malformed requests

## Status Polling

The app automatically polls video status every 5 seconds for videos that are in progress, ensuring you always see the latest status without manual refresh.
