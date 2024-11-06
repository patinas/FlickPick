# Stremio TMDb Similar Movies Addon

This addon provides movie recommendations using TMDb's API.

## Features
- Fetches similar movies from TMDb
- Caches responses to minimize API calls
- Modular architecture for maintainability

## Setup

1. Copy `.env.example` to `.env` and add your TMDb API key:
```
TMDB_API_KEY=your_api_key_here
```

2. Install dependencies:
```
npm install
```

3. Start the addon:
```
npm start
```

## Project Structure
- `src/config/` - Configuration files
- `src/services/` - External API integrations
- `src/handlers/` - Request handlers
- `src/server.js` - Main application entry point