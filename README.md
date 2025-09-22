# Crypto Dashboard (Vite + React + Tailwind)

This is a small crypto dashboard demo that fetches market data from CoinGecko and displays:
- All coins view (rank, name, price, 24h change, market cap, volume)
- Search, sort, pagination
- Highlights (top gainers, top losers, highest volume, trending)
- Loading & error states

## Setup

1. Copy `.env.example` to `.env` and adjust if needed:
```
VITE_COINGECKO_API_BASE=https://api.coingecko.com/api/v3
```

2. Install & run:
```bash
npm install
npm run dev
```

## Notes
- Uses CoinGecko public endpoints. For heavy usage, follow CoinGecko's API key setup and set env var accordingly.
- This skeleton focuses on structure and is intended to be extended.
